import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Bluetooth, RFID, User } from '@prisma/client';
import { isUUID } from 'class-validator';
// import { TagsService } from 'src/tags/tags.service';
// import { MacService } from 'src/mac/mac.service';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly Tags: TagsService = new TagsService(prisma),
    // private readonly Macs: MacService = new MacService(prisma)
  ) { }

  async create(createUserDto: CreateUserDto, requestUser: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    let user: User

    if (createUserDto.role === 'ADMIN') {
      user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          registration: createUserDto.registration,
          role: createUserDto.role,
          password: hashedPassword,
          adminEnvironment: createUserDto.envId ? { connect: { id: createUserDto.envId } } : undefined,
          RFID: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
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
          RFID: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
        }
      })
    }

    return user;
  }

  async findAllFrequenters() {
    return await this.prisma.user.findMany({
      where: { role: 'FREQUENTER' },
      include: { RFID: true }
    });
  }

  async findAllFrequentersByEnvironment(envId: string) {
    return await this.prisma.user.findMany({
      where: { role: 'FREQUENTER', environmentFrequenterId: envId }, // 
      include: { RFID: true }
    });
  }

  async findAllAdminsByEnvironment(envId: string) {
    return await this.prisma.user.findMany({
      where: { role: 'ADMIN', environmentAdminId: envId }, // role: 'FREQUENTER', 
      include: { RFID: true }
    });
  }

  async findAllAdmins() {
    return await this.prisma.user.findMany({
      where: { role: 'ADMIN' }
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
        Bluetooth: true,
        RFID: true
      }
    });

    return user;
  }

  async update(id: string, role: string, updateUserDto: UpdateUserDto, requestUser: User) {
    if (requestUser.role === 'FREQUENTER' && requestUser.id !== id) {
      throw new UnauthorizedException("Can't update");
    }

    if (requestUser.role === 'ADMIN' && role === 'ADMIN' && requestUser.id !== id) {
      throw new UnauthorizedException("An admin cannot update another admin");
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