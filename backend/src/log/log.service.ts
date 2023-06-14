import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserForLog(data: CreateLogDto) {
    let userRegistration: { registration: string }
    let obolType: string

    if (data.userTag) {
      userRegistration = await this.prisma.user.findFirstOrThrow({
        where: {
          rfid: { tag: data.userTag }
        },
        select: {
          registration: true
        }
      })
      
      data.userRegistration = userRegistration.registration
      obolType = 'TAG_RFID'
    }

    if (data.userMac) {
      userRegistration = await this.prisma.user.findFirstOrThrow({
        where: {
          mac: data.userMac
        },
        select: {
          registration: true
        }
      })

      data.userRegistration = userRegistration.registration
      obolType = 'DEVICE_MAC'
    }

    console.log(userRegistration);
    
    return { data, obolType }
  }

  async create(data: CreateLogDto) {
    const caronte = await this.prisma.caronte.findFirstOrThrow({
      where: {
        esp: data.caronteMac
      },
    })

    const isPasswordValid = await bcrypt.compare(data.carontePassword, caronte.password);

    if (!isPasswordValid) {
      throw new HttpException('Unauthorized caronte access', HttpStatus.UNAUTHORIZED);
    }

    let userDataResponse: { data: CreateLogDto, obolType: string }

    if (!data.userRegistration) {
      userDataResponse = await this.getUserForLog(data)
    }

    try {
      await this.prisma.log.create({
        data: {
          message: userDataResponse.data.message,
          obolType: userDataResponse.obolType,
          type: userDataResponse.data.type,
          caronte: { connect: { esp: userDataResponse.data.caronteMac } },
          user: { 
            connect: { 
              registration: userDataResponse ? userDataResponse.data.userRegistration : data.userRegistration
            } 
          }
        }
      });
      
    } catch (error) {
      console.log(error.code);
      
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

    return {
      created: true
    }
  }

  async findAll() {
    return this.prisma.log.findMany();
  }

  async findAllByCaronte(caronteMac: string) {
    return this.prisma.log.findMany({
      where: { caronteMac }
    });
  }

  async findAllByUser(userRegistration: string) {
    return this.prisma.log.findMany({
      where: { userRegistration }
    });
  }

  async findOne(id: string) {
    return this.prisma.log.findFirstOrThrow({
      where: { id }
    });
  }
}
