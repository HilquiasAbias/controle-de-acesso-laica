import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { isUUID } from 'class-validator';
import { DateTime } from 'luxon';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, requestUser: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    let user: User

    if (createUserDto.role === 'ADMIN' || createUserDto.role === 'ENVIRONMENT-MANAGER') {
      user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          registration: createUserDto.registration,
          role: createUserDto.role,
          password: hashedPassword,
          adminEnvironment: createUserDto.envId ? { connect: { id: createUserDto.envId } } : undefined,
          rfid: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
        }
      })
    } else {
      user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          registration: createUserDto.registration,
          role: createUserDto.role,
          password: hashedPassword,
          frequenterEnvironment: createUserDto.envId ? { connect: { id: createUserDto.envId } } : undefined,
          rfid: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
        }
      })
    }

    if (createUserDto.accessTime) {
      await Promise.all(
        createUserDto.accessTime.map(async (accessTime) => {
          const { day, startTime, endTime } = accessTime;

          await this.prisma.accessTime.create({
            data: {
              userId: user.id,
              dayOfWeek: day,
              startTime: DateTime.fromFormat(startTime, 'HH:mm:ss').toISO(),
              endTime: DateTime.fromFormat(endTime, 'HH:mm:ss').toISO(),
            }
          })
        })
      );
    }

    return user;
  }

  async findAllFrequenters() {
    return await this.prisma.user.findMany({
      where: { role: 'FREQUENTER' },
      include: { rfid: true }
    });
  }

  async findAllFrequentersByEnvironment(envId: string) {
    return await this.prisma.user.findMany({
      where: { role: 'FREQUENTER', environmentFrequenterId: envId }, // 
      include: { rfid: true }
    });
  }

  async findAllAdminsByEnvironment(envId: string) {
    return await this.prisma.user.findMany({
      where: { role: 'ADMIN', environmentAdminId: envId }, // role: 'FREQUENTER', 
      include: { rfid: true }
    });
  }

  async findAllAdmins() {
    return await this.prisma.user.findMany({
      where: { role: 'ADMIN' },
      include: { rfid: true }
    });
  }

  async getOneForLogin(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id input', HttpStatus.BAD_REQUEST);
    }

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        adminEnvironment: true,
        frequenterEnvironment: true,
        rfid: true
      }
    });

    return user;
  }

  async findOne(id: string, requestUserId: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id input', HttpStatus.BAD_REQUEST);
    }

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        adminEnvironment: true,
        frequenterEnvironment: true,
        rfid: true
      }
    });

    if (user.role === 'FREQUENTER' && user.id !== requestUserId) {
      throw new HttpException("A frequenter only sees their own data", HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async updateWithoutCheckUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        data: { ...updateUserDto },
        where: {
          id
        }
      })
    } catch (error) {
      
    }
  }

  async frequenterSelfUpdate(id: string, updateUserDto: UpdateUserDto, requestUser: User) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id input', HttpStatus.BAD_REQUEST);
    }

    const validFields = ['name', 'registration', 'password', 'mac'];
    const invalidFields = Object.keys(updateUserDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new HttpException(`Invalid fields provided: ${invalidFields.join(', ')}`, HttpStatus.BAD_REQUEST);
    }

    if (requestUser.id !== id) { // TODO: adcionar à rota: requestUser.role === 'FREQUENTER'
      throw new HttpException("Can't update", HttpStatus.UNAUTHORIZED);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    try {
      return await this.prisma.user.update({
        data: updateUserDto,
        where: { id }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      } else if (error.code === 'P2002') {
        throw new HttpException('Already exists', HttpStatus.CONFLICT);
      } else {
        throw new HttpException("Can't update tag.", HttpStatus.FORBIDDEN);
      }
    }
  }

  async update(id: string, role: string, updateUserDto: UpdateUserDto, requestUser: User) { // TODO: para adcionar mais papéis de usuários, precisa quebrar esta função em várias
    if (!isUUID(id)) {
      throw new HttpException('Invalid id input', HttpStatus.BAD_REQUEST);
    }

    const validFields = ['name', 'registration', 'password', 'role', 'mac'];
    const invalidFields = Object.keys(updateUserDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields provided: ${invalidFields.join(', ')}`,
      );
    }

    if (requestUser.role === 'FREQUENTER' && requestUser.id !== id) {
      throw new UnauthorizedException("Can't update");
    }

    if (requestUser.role === 'ADMIN' && role === 'ADMIN' && requestUser.id !== id) {
      throw new UnauthorizedException("An admin cannot update another admin");
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    const updatedUser = await this.prisma.user.update({
      data: {
        name: updateUserDto.name,
        registration: updateUserDto.registration,
        password: updateUserDto.password,
        role: updateUserDto.role
      },
      where: { id }
    });

    return updatedUser;
  }

  // async update(id: string, updateUserDto: UpdateUserDto, requestUser: User) {
  //   if (!isUUID(id)) {
  //     throw new HttpException('Invalid id input', HttpStatus.BAD_REQUEST);
  //   }

  //   const validFields = ['name', 'registration', 'password', 'role'];
  //   const invalidFields = Object.keys(updateUserDto).filter(
  //     field => !validFields.includes(field),
  //   );

  //   if (invalidFields.length > 0) {
  //     throw new HttpException(`Invalid fields provided: ${invalidFields.join(', ')}`, HttpStatus.BAD_REQUEST);
  //   }

  //   if (requestUser.role === 'FREQUENTER' && requestUser.id !== id) {
  //     throw new HttpException("Can't update", HttpStatus.UNAUTHORIZED);
  //   }

  //   if (requestUser.role === 'ADMIN' && requestUser.id !== id) {
  //     throw new HttpException("An admin cannot update another admin", HttpStatus.UNAUTHORIZED);
  //   }

  //   if (updateUserDto.password) {
  //     updateUserDto.password = await bcrypt.hash(
  //       updateUserDto.password,
  //       roundsOfHashing,
  //     );
  //   }

  //   const user = await this.prisma.user.findFirstOrThrow({ where: { id } }) // TODO: verificar papel do usuário que vai ser atualizado

  //   const updatedUser = await this.prisma.user.update({
  //     data: {
  //       name: updateUserDto.name,
  //       registration: updateUserDto.registration,
  //       password: updateUserDto.password,
  //       role: updateUserDto.role
  //     },
  //     where: { id }
  //   });

  //   return updatedUser;
  // }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id input', HttpStatus.BAD_REQUEST);
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id }
    });

    return deletedUser;
  }
}