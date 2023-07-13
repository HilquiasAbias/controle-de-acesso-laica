import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Log, User } from '@prisma/client';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLogDto) {
    const caronte = await this.prisma.caronte.findFirstOrThrow({
      where: {
        esp: data.deviceMac
      },
    })

    let log: Log

    try {
      log = await this.prisma.log.create({
        data: {
          message: data.message,
          topic: data.topic,
          type: data.type,
          caronte: { connect: { esp: data.deviceMac } },
        }
      });
      
    } catch (error) {
      console.log(error);
      
      if (error.code === 'P2025') {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      } else if (error.code === 'P2002') {
        throw new HttpException('Already exists', HttpStatus.CONFLICT);
      } else {
        throw new HttpException('Failed to create log', HttpStatus.FORBIDDEN);
      }
    }

    // if (!log) {
    //   throw new HttpException('Failed to create log', HttpStatus.FORBIDDEN);
    // }

    return log
  }

  async findAll() {
    return this.prisma.log.findMany();
  }

  async findAllByCaronte(id: string) {
    return this.prisma.log.findMany({
      where: { id }
    });
  }


  async findOne(id: string) {
    return this.prisma.log.findFirstOrThrow({
      where: { id }
    });
  }
}
