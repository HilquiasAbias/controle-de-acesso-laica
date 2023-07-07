import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { isEmail, isUUID } from 'class-validator';
import { UpdateUserGeneralDto } from './dto/update-user-general.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { UserStatusDto } from './dto/status-user.dto';

export const roundsOfHashing = 10;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {} 

  async create(createUserDto: CreateUserDto) {
    const validFields = ['email', 'name', 'registration', 'password', 'roles', 'tag', 'mac'];
    const invalidFields = Object.keys(createUserDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new RpcException({
        statusCode: 400,
        message: `Invalid fields provided: ${invalidFields.join(', ')}`,
        error: 'Bad Request',
      });
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    let user: User

    try {
      user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          registration: createUserDto.registration,
          email: createUserDto.email,
          password: hashedPassword,
          Rfid: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
        },
        include: {
          Rfid: true
        }
      })
    } catch (error) {
      if (error.code === 'P2002') {
        throw new RpcException({
          statusCode: 409,
          message: `Already exists: ${error.meta.target}`,
          error: 'Conflict',
        })
      } else {
        throw new RpcException({
          statusCode: 403,
          message: "Can't create user",
          error: 'Forbidden',
        });
      }
    }

    for (const role of createUserDto.roles) {
      await this.prisma.userRoles.create({
        data: {
          User: { connect: { id: user.id } },
          role,
        },
      });
    }

    if (createUserDto.envId) {} // TODO: se comunicar com Environments para adcionar o usuário criado

    return user;
  }

  async findAllFrequenters() {
    return await this.prisma.user.findMany({
      where: { 
        Roles: {
          some: {
            role: 'FREQUENTER'
          }
        },
        active: true
      },
      include: {
        Rfid: true, 
        Device: true, 
        Roles: true
      }
    });
  }

  async findAllAdmins() {
    return await this.prisma.user.findMany({
      where: { 
        Roles: {
          some: {
            role: 'ADMIN'
          }
        },
        active: true
      },
      include: {
        Rfid: true, 
        Device: true, 
        Roles: true
      }
    });
  }

  async findAllEnvironmentManager() {
    return await this.prisma.user.findMany({
      where: { 
        Roles: {
          some: {
            role: 'ENVIRONMENT_MANAGER'
          }
        },
        active: true
      },
      include: {
        Rfid: true, 
        Device: true, 
        Roles: true
      }
    });
  }

  async findAllInactive() {
    return await this.prisma.user.findMany({
      where: {
        active: false
      },
      include: {
        Rfid: true, 
        Device: true, 
        Roles: true
      }
    });
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new RpcException({
        statusCode: 400,
        message: 'Invalid id input',
        error: 'Bad Request',
      })
    }

    try {
      return await this.prisma.user.findFirstOrThrow({
        where: {
          id,
          active: true
        },
        include: {
          Rfid: true, 
          Device: true, 
          Roles: true
        }
      });
    } catch (error) {
      console.log(error);
      
      if (error.code === 'P2025') {
        throw new RpcException({
          statusCode: 404,
          message: error.message,
          error: 'Not Found',
        })
      }
    }
  }

  async findOneForAuth(id: string) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          id,
          active: true
        }
      });

      return {
        id: user.id,
        password: user.password
      }
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RpcException({
          statusCode: 404,
          message: error.message,
          error: 'Not Found',
        })
      }
    }
  }

  async updateGeneralData(id: string, updateUserGeneralDto: UpdateUserGeneralDto) {
    if (!isUUID(id)) {
      throw new RpcException({
        statusCode: 400,
        message: 'Invalid id input',
        error: 'Bad Request',
      })
    }

    try {
      return await this.prisma.user.update({
        data: {
          name: updateUserGeneralDto.name,
          email: updateUserGeneralDto.email,
          registration: updateUserGeneralDto.registration,
          password: updateUserGeneralDto.password
        },
        where: { id }
      })
    } catch (error) {
      console.log(error);
      
      if (error.code === 'P2002') {
        throw new RpcException({
          statusCode: 409,
          message: `Already exists: ${error.meta.target}`,
          error: 'Conflict',
        })
      } else if (error.code === 'P2025') {
        throw new RpcException({
          statusCode: 404,
          message: error.meta.cause, // error.message,
          error: 'Not Found',
        })
      } else {
        throw new RpcException({
          statusCode: 403,
          message: "Can't update user",
          error: 'Forbidden',
        });
      }
    }
  }

  async updateRolesData(userId: string, updateUserRolesDto: UpdateUserRolesDto) {
    if (!isUUID(userId)) {
      throw new RpcException({
        statusCode: 400,
        message: 'Invalid id input',
        error: 'Bad Request',
      })
    }

    console.log(updateUserRolesDto);

    const { rolesToAdd, rolesToRemove } = updateUserRolesDto;

    try {
      if (rolesToAdd && rolesToAdd.length > 0) {
        await Promise.all(
          rolesToAdd.map(async (role) => {
            await this.prisma.userRoles.create({
              data: {
                role,
                User: { connect: { id: userId } }
              },
            });
          })
        );
      }
  
      if (rolesToRemove && rolesToRemove.length > 0) {
        await Promise.all(
          rolesToRemove.map(async (role) => {
            const userRole = await this.prisma.userRoles.findFirst({
              where: {
                userId,
                role
              }
            });
      
            console.log(userRole);
      
            await this.prisma.userRoles.update({
              where: {
                id: userRole.id
              },
              data: {
                active: false
              }
            });
          })
        );
      }
    } catch (error) {
      if (error.code === 'P2002') {
        throw new RpcException({
          statusCode: 409,
          message: `Already exists: ${error.meta.target}`,
          error: 'Conflict',
        })
      } else if (error.code === 'P2025') {
        throw new RpcException({
          statusCode: 404,
          message: error.meta.cause, // error.message,
          error: 'Not Found',
        })
      }
    }


    return await this.prisma.userRoles.findMany({
      where: { userId }
    })
  }

  async changeUserStatus(userId: string, userStatusDto: UserStatusDto) {
    if (!isUUID(userId)) {
      throw new RpcException({
        statusCode: 400,
        message: 'Invalid id input',
        error: 'Bad Request',
      })
    }

    let user: User

    try {
      user = await this.prisma.user.findFirstOrThrow({
        where: { id: userId }
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RpcException({
          statusCode: 404,
          message: error.message,
          error: 'Not Found',
        })
      }
    }

    const { action } = userStatusDto

    if (action === 'ACTIVATE' && user.active) {
      throw new RpcException({
        statusCode: 409,
        message: 'User is already active',
        error: 'Conflict',
      })
    }

    if (action === 'DEACTIVATE' && !user.active) {
      throw new RpcException({
        statusCode: 409,
        message: 'User is already inactive',
        error: 'Conflict',
      })
    }

    try {
      user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          active: action === 'ACTIVATE' ? true : false
        }
      })

      await this.updateUserRelationsStatus(userId, action)

      return user
    } catch (error) {
      throw new RpcException({
        statusCode: 403,
        message: "Can't update user status",
        error: 'Forbidden',
      });
    }
  }

  private async updateUserRelationsStatus(userId: string, action: string) {
    await this.prisma.$transaction(async (prisma) => {
      const flag = action === 'ACTIVATE' ? true : false

      await prisma.rfid.updateMany({
        where: { userId },
        data: { active: flag },
      });

      await prisma.mobile.updateMany({
        where: { userId },
        data: { active: flag },
      });

      await prisma.userRoles.updateMany({
        where: { userId },
        data: { active: flag },
      });
    });
  }
}
