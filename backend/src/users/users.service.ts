import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Bluetooth, Tag, User } from '@prisma/client';
import { TagsService } from 'src/tags/tags.service';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly Tags: TagsService = new TagsService(prisma)
    ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        registration: createUserDto.registration,
        role: createUserDto.role,
        password: hashedPassword
      }
    })
    
    let tag: Tag | undefined
    let bluetooth: Bluetooth | undefined

    if (createUserDto.bluetooth) {
      bluetooth = await this.prisma.bluetooth.create({ 
        data: { content: createUserDto.bluetooth }
      }) 
    }

    if (createUserDto.tag) {
      tag = await this.Tags.create({ content: createUserDto.tag, userId: user.id  })
    }

    return user;
  }

  async createAndLinkEnvironment(createUserDto: CreateUserDto, envId: number) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        registration: createUserDto.registration,
        role: createUserDto.role,
        password: hashedPassword,
        adminEnvironment: createUserDto.role === 'ADMIN' ? { connect:{ id:envId } } : undefined,
        frequenterEnvironment: createUserDto.role === 'FREQUENTER' ? { connect:{ id:envId } } : undefined
      },
    });

    let tag: Tag
    let bluetooth: Bluetooth

    if (createUserDto.bluetooth) {
      bluetooth = await this.prisma.bluetooth.create({ 
        data: { content: createUserDto.bluetooth }
      }) 
    }

    if (createUserDto.tag) {
      tag = await this.Tags.create({ content: createUserDto.tag  })
    }

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        adminEnvironment: true,
        frequenterEnvironment: true,
        tag: true,
        bluetooth: true
      }
    });
  }

  async findAllFrequenters() {
    return await this.prisma.user.findMany({
      where: { role: 'FREQUENTER' }
    });
  }

  async findAllAdmins() {
    return await this.prisma.user.findMany({
      where: { role: 'ADMIN' }
    });
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Invalid Input. ID must be sent.');
    }

    const user = await this.prisma.user.findUniqueOrThrow({ 
      where: { id },
      include: {
        adminEnvironment: true,
        frequenterEnvironment: true,
        tag: true,
        bluetooth: true
      }
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
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

  async remove(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid input. ID must be a number.');
    }
    
    const deletedUser = await this.prisma.user.delete({
      where: { id }
    });

    return deletedUser;
  }
}
