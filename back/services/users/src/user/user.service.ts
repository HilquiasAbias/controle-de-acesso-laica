import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UserService {
  constructor(private readonly prisma = new PrismaClient()) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        registration: createUserDto.registration,
        email: createUserDto.email,
        role: createUserDto.role,
        password: hashedPassword,
        Rfid: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
      }
    })

    if (createUserDto.envId) {} // TODO: se comunicar com Environments para adcionar o usuário criado

    return user;
  }
}
