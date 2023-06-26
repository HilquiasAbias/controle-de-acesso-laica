import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';

export const roundsOfHashing = 10;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
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
          role: createUserDto.role,
          password: hashedPassword,
          Rfid: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
        }
      })
    } catch (error) {
      if (error.code === 'P2002') {
        throw new RpcException({
          statusCode: 409,
          message: 'Already exists',
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

    if (createUserDto.envId) {} // TODO: se comunicar com Environments para adcionar o usuário criado

    return user;
  }

  async findAllFrequenters() {
    return await this.prisma.user.findMany({
      where: { role: 'FREQUENTER' },
      include: { Rfid: true }
    });
  }

  async findAllAdmins() {
    return await this.prisma.user.findMany({
      where: { role: 'ADMIN' },
      include: { Rfid: true }
    });
  }
}
