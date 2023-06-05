import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Rfid, User } from '@prisma/client';
import { isUUID } from 'class-validator';
import { RfidService } from 'src/rfid/rfid.service';
// import { MacService } from 'src/mac/mac.service';

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
          ...createUserDto,
          password: hashedPassword,
          adminEnvironment: createUserDto.envId ? { connect: { id: createUserDto.envId } } : undefined,
          rfid: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
        }
      })
    } else {
      user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          frequenterEnvironment: createUserDto.envId ? { connect: { id: createUserDto.envId } } : undefined,
          rfid: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
        }
      })
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

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid Input. ID must be sent.');
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

  async update(id: string, updateUserDto: UpdateUserDto, requestUser: User) {
    if (isUUID(id)) {
      throw new BadRequestException('Invalid id input');
    }

    const validFields = ['name', 'registration', 'password', 'role'];
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

    if (requestUser.role === 'ADMIN' && requestUser.id !== id) {
      throw new UnauthorizedException("An admin cannot update another admin");
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    const user = await this.prisma.user.findFirstOrThrow({ where: { id } }) // TODO: verificar papel do usuário que vai ser atualizado

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

  async remove(id: string) {
    if (isUUID(id)) {
      throw new BadRequestException('Invalid id input');
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id }
    });

    return deletedUser;
  }
}