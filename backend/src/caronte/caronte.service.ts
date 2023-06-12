import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isUUID } from 'class-validator';
import { AccessTime, Log, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ObolForCharonDto } from './dto/obol-caronte.dto';
import { IEnvToFindUser } from 'src/interfaces/env-to-find-user';
import { UserWithAccessTime, UserWithAccessTimeWithoutRFID } from 'src/interfaces/user-with-accesstime';

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

  async findUserByTag(tag: string, users: IEnvToFindUser) { //
    let user: UserWithAccessTime

    user = users.admins.find(admin => admin.rfid.tag === tag)

    if (!user) {
      user = users.frequenters.find(frequenter => frequenter.rfid.tag === tag)
    }

    return user
  }

  async findUserByMac(mac: string, users: IEnvToFindUser) {
    let user: UserWithAccessTime

    user = users.admins.find(admin => admin.mac === mac)

    if (!user) {
      user = users.frequenters.find(frequenter => frequenter.mac === mac)
    }

    return user
  }

  async findUserByData(registration: string, password: string, users: IEnvToFindUser) {
    let user: UserWithAccessTime

    user = users.admins.find(admin => admin.registration === registration)

    if (!user) {
      user = users.frequenters.find(frequenter => frequenter.registration === registration)
    }
  
    if (!user) 
      return undefined;
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    return isPasswordValid ? user : undefined;
  }

  async isCurrentTimeValidForUser(accessTimes: AccessTime[]): Promise<boolean> { // userId: string
    // const user = await this.prisma.user.findUnique({
    //   where: { id: userId },
    //   include: {
    //     accessTimes: true
    //   },
    // });

    if (!accessTimes || accessTimes.length === 0) {
      // O usuário não tem horários de acesso definidos
      return false;
    }

    const currentTime = new Date();

    console.log((await this.prisma.accessTime.findFirst()).startTime)
    
    const currentDayOfWeek = this.getDayOfWeek(currentTime);

    // Verificar se o horário atual está dentro de algum AccessTime
    const isValidTime = accessTimes.some(
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
    const validFields = ['ip', 'esp', 'carontePassword', 'userPassword', 'userRegistration', 'userId', 'userDeviceMac', 'userTagRFID'];
    const invalidFields = Object.keys(obolForCharon).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new HttpException(`Invalid fields provided: ${invalidFields.join(', ')}`, HttpStatus.BAD_REQUEST);
    }

    const caronte = await this.prisma.caronte.findFirstOrThrow({
      where: {
        esp: obolForCharon.esp,
        ip: obolForCharon.ip
      },
      include: {
        Environment: {
          select: {
            admins: {
              include: {
                accessTimes: true,
                rfid: true
              }
            },
            frequenters: {
              include: {
                accessTimes: true,
                rfid: true
              }
            }
          }
        }
      }
    })

    const isCarontePasswordValid = await bcrypt.compare(
      obolForCharon.carontePassword, caronte.password
    )

    if (!isCarontePasswordValid) {
      throw new HttpException('Unauthorized caronte access', HttpStatus.UNAUTHORIZED);
    }
    
    let user: UserWithAccessTimeWithoutRFID
    
    if (obolForCharon.userTagRFID) {
      user = await this.findUserByTag(obolForCharon.userTagRFID, caronte.Environment)
    }

    if (!user && obolForCharon.userDeviceMac) {
      user = await this.findUserByMac(obolForCharon.userDeviceMac, caronte.Environment)
    }

    if (!user && obolForCharon.userRegistration) {
      user = await this.findUserByData(obolForCharon.userRegistration, obolForCharon.userPassword, caronte.Environment)      
    }

    if (!user) {
      throw new HttpException('Unauthorized user access', HttpStatus.UNAUTHORIZED);
    }

    // if (!user) {
    //   log = await this.prisma.log.create({
    //     data: {
    //       successful: false,
    //       caronte: { connect: { id: caronte.id } }
    //     }
    //   })
    //   console.log(log);
    //   throw new UnauthorizedException('Unauthorized user access');
    // }

    // log = await this.prisma.log.create({
    //   data: {
    //     successful: true,
    //     caronte: { connect: { id: caronte.id } },
    //     user: { connect: { id: user.id } }
    //   }
    // })

    // console.log(log);
    

    const isUserAccessTimeValid = await this.isCurrentTimeValidForUser(user.accessTimes)

    if (!isUserAccessTimeValid) {
      throw new HttpException('Unauthorized user access', HttpStatus.UNAUTHORIZED);
    }

    return {
      access: true
    }
  }
}
