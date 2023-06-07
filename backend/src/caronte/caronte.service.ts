import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isUUID } from 'class-validator';
import { AccessTime, Log, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CaronteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCaronteDto: CreateCaronteDto) {
    try {
      return await this.prisma.caronte.create({
        data: createCaronteDto,
      })
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException("Caronte already exists", HttpStatus.CONFLICT);
      } else if (error.code === 'P2003') {
        throw new HttpException("Environment not found", HttpStatus.CONFLICT);
      } else {
        throw new HttpException("Something went wrong", HttpStatus.FORBIDDEN);
      }
    }
  }

  async findAll() {
    return await this.prisma.caronte.findMany();
  }

  async findAllByEnvironment(envId: string) {
    if (!isUUID(envId)) {
      throw new HttpException("Invalid input id", HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.caronte.findMany({
      where: {
        environmentId: envId
      }
    });
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException("Invalid input id", HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.caronte.findFirstOrThrow({
      where: { id }
    });
  }

  async update(id: string, updateCaronteDto: UpdateCaronteDto) {
    return `This action updates a #${id} caronte`;
  }

  async remove(id: string) {
    return `This action removes a #${id} caronte`;
  }

  async findUserByTag(tag: string, envId: string) {
    const environment = await this.prisma.environment.findUnique({
      where: {
        id: envId
      },
      include: {
        admins: {
          where: {
            rfid: {
              tag: tag
            }
          },
          take: 1
        },
        frequenters: {
          where: {
            rfid: {
              tag: tag
            }
          },
          take: 1
        }
      },
    });

    if (environment.admins.length === 1) {
      return environment.admins.shift()
    }
  
    return environment.frequenters.shift()
  }

  async findUserByMac(mac: string, envId: string) {
    const environment = await this.prisma.environment.findUnique({
      where: {
        id: envId
      },
      include: {
        admins: {
          where: {
            mac
          },
          take: 1
        },
        frequenters: {
          where: {
            mac
          },
          take: 1
        }
      },
    });

    if (environment.admins.length === 1) {
      return environment.admins.shift()
    }
  
    return environment.frequenters.shift()
  }

  async findUserByData(registration: string, password: string, envId: string) {
    const environment = await this.prisma.environment.findUnique({
      where: {
        id: envId
      },
      include: {
        admins: {
          where: {
            registration,
          },
          take: 1
        },
        frequenters: {
          where: {
            registration
          },
          take: 1
        }
      },
    });

    let user: User
    
    if (environment.admins.length === 1) {
      user = environment.admins.shift()
    } else {
      user = environment.frequenters.shift()
    }

    if (!user) return undefined

    const isPasswordValid = await bcrypt.compare(
      password, user.password
    )

    return isPasswordValid ? user : undefined
  }

  async isCurrentTimeValidForUser(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        accessTimes: true
      },
    });

    if (user.accessTimes) {
      // O usuário não tem horários de acesso definidos
      return false;
    }

    const currentTime = new Date();
    const currentDayOfWeek = this.getDayOfWeek(currentTime);

    // Verificar se o horário atual está dentro de algum AccessTime
    const isValidTime = user.accessTimes.some(
      (accessTime: AccessTime) =>
        accessTime.dayOfWeek === currentDayOfWeek &&
        this.isTimeWithinRange(currentTime, accessTime.startTime, accessTime.endTime),
    );

    return isValidTime;
  }

  private getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  private isTimeWithinRange(time: Date, startTime: Date, endTime: Date): boolean {
    return time >= startTime && time <= endTime;
  }

  async anObolForCharon(obolForCharon: ObolForCharonDto) {
    const validFields = ['ip', 'esp', 'carontePassword', 'userPassword', 'userRegister', 'userId', 'userDeviceMac', 'userTagRFID'];
    const invalidFields = Object.keys(obolForCharon).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields provided: ${invalidFields.join(', ')}`,
      );
    }

    const caronte = await this.prisma.caronte.findFirst({
      where: {
        esp: obolForCharon.esp
      }
    })

    if (!caronte) {
      throw new UnauthorizedException('Unauthorized caronte access');
    }

    const isCarontePasswordValid = await bcrypt.compare(
      obolForCharon.carontePassword, caronte.password
    )

    if (!isCarontePasswordValid) {
      throw new UnauthorizedException('Unauthorized caronte access');
    }
    
    let user: User
    let log: Log
    
    if (obolForCharon.userTagRFID) {
      user = await this.findUserByTag(obolForCharon.userTagRFID, caronte.environmentId)
    }

    if (!user && obolForCharon.userDeviceMac) {
      user = await this.findUserByTag(obolForCharon.userTagRFID, caronte.environmentId)
    }

    if (!user && obolForCharon.userRegister) {
      user = await this.findUserByData(obolForCharon.userRegister, obolForCharon.userPassword, caronte.environmentId)
    }

    if (!user) {
      log = await this.prisma.log.create({
        data: {
          successful: false,
          caronte: { connect: { id: caronte.id } }
        }
      })
      console.log(log);
      throw new UnauthorizedException('Unauthorized user access');
    }

    log = await this.prisma.log.create({
      data: {
        successful: true,
        caronte: { connect: { id: caronte.id } },
        user: { connect: { id: user.id } }
      }
    })

    console.log(log);
    
    return {
      access: 'valid'
    }
  }
}
