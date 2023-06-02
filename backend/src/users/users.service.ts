import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor (private readonly prisma: PrismaService) {}

  async testUser() {
    const startTime = new Date();
    const endTime = new Date();

    startTime.setHours(10, 0, 0);
    endTime.setHours(15, 0, 0);

    const user: User = await this.prisma.user.create({
      data: {
        name: 'teste',
        password: 'teste',
        registration: 'test',
        role: 'ADMIN',
        accessTimes: {
          create: {
            dayOfWeek: 'SEGUNDA',
            startTime: startTime,
            endTime: endTime
          }
        }
      }
    })
  }
}
