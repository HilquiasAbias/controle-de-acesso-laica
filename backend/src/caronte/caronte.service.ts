import { Injectable, HttpException, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { roundsOfHashing } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CaronteValidationDto } from './dto/user-validate-pass.dto';
import { Log, User } from '@prisma/client';

@Injectable()
export class CaronteService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByTag(tag: string, envId: number) {
    const environment = await this.prisma.environment.findUnique({
      where: {
        id: envId
      },
      include: {
        admins: {
          where: {
            tag: {
              content: tag
            }
          },
          take: 1
        },
        frequenters: {
          where: {
            tag: {
              content: tag
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

  async findUserByMac(mac: string, envId: number) {
    const environment = await this.prisma.environment.findUnique({
      where: {
        id: envId
      },
      include: {
        admins: {
          where: {
            mac: {
              content: mac
            }
          },
          take: 1
        },
        frequenters: {
          where: {
            mac: {
              content: mac
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

  async findUserByData(registration: string, password: string, envId: number) {
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

  async validateUser(userValidatePass: CaronteValidationDto) {
    const validFields = ['ip', 'esp', 'carontePassword', 'userPassword', 'userRegister', 'userId', 'userDeviceMac', 'userTagRFID'];
    const invalidFields = Object.keys(userValidatePass).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields provided: ${invalidFields.join(', ')}`,
      );
    }

    const caronte = await this.prisma.caronte.findFirst({
      where: {
        esp: userValidatePass.esp
      }
    })

    if (!caronte) {
      throw new UnauthorizedException('Unauthorized caronte access');
    }

    const isCarontePasswordValid = await bcrypt.compare(
      userValidatePass.carontePassword, caronte.password
    )

    if (!isCarontePasswordValid) {
      throw new UnauthorizedException('Unauthorized caronte access');
    }
    
    let user: User
    let log: Log
    
    if (userValidatePass.userTagRFID) {
      user = await this.findUserByTag(userValidatePass.userTagRFID, caronte.environmentId)
    }

    if (!user && userValidatePass.userDeviceMac) {
      user = await this.findUserByTag(userValidatePass.userTagRFID, caronte.environmentId)
    }

    if (!user && userValidatePass.userRegister) {
      user = await this.findUserByData(userValidatePass.userRegister, userValidatePass.userPassword, caronte.environmentId)
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

  async create(createCaronteDto: CreateCaronteDto) {
    const hashedPassword = await bcrypt.hash(
      createCaronteDto.password,
      roundsOfHashing,
    );

    try {
      return await this.prisma.caronte.create({
        data: {
          ip: createCaronteDto.ip,
          esp: createCaronteDto.esp,
          password: hashedPassword,
          Environment: {
            connect: { id: createCaronteDto.environmentId }
          }
        }
      }) 
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException("Caronte alredy exists.", HttpStatus.CONFLICT);
      } else if (error.code === 'P2025') {
        throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException("Can't create caronte.", HttpStatus.FORBIDDEN);
      }
    }
  }

  async findAll() {
    try {
      return await this.prisma.caronte.findMany()
    } catch (error) {
      throw new HttpException("Something goes wrong", HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new HttpException('Invalid Input. ID must be sent', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.caronte.findFirstOrThrow({
      where: { id }
    });
  }

  async update(id: number, updateCaronteDto: UpdateCaronteDto) {
    if (!id) {
      throw new HttpException('Invalid Input. ID must be sent', HttpStatus.BAD_REQUEST);
    }
    
    const validFields = ['ip', 'esp', 'password', 'environmentId'];
    const invalidFields = Object.keys(updateCaronteDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields provided: ${invalidFields.join(', ')}`,
      );
    }

    if (updateCaronteDto.password) {
      updateCaronteDto.password = await bcrypt.hash(
        updateCaronteDto.password,
        roundsOfHashing,
      );
    }

    try {
      return await this.prisma.caronte.update({
        where: { id },
        data: updateCaronteDto
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException("Environment not found", HttpStatus.NOT_FOUND);
      } else if (error.code === 'P2002') {
        throw new HttpException("This caronte already exists", HttpStatus.CONFLICT);
      } else {
        throw new HttpException("Can't update caronte.", HttpStatus.FORBIDDEN);
      }
    }
  }

  async remove(id: number) {
    if (isNaN(id)) {
      throw new HttpException("Id must be a number", HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.caronte.delete({
      where: { id }
    });
  }
}
