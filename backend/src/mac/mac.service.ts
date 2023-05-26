import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateMacDto } from './dto/create-mac.dto';
import { UpdateMacDto } from './dto/update-mac.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Mac, User } from '@prisma/client';
import { ReadEnvMacsDto } from './dto/read-env-macs.dto';

@Injectable()
export class MacService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMacDto: CreateMacDto, requestUser: User) {
    if (requestUser.id !== createMacDto.userId) {
      throw new HttpException('Users only changes their own macs', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: createMacDto.userId },
      include: { mac: true }
    })

    if (user.mac) {
      throw new HttpException('User already has a mac', HttpStatus.FORBIDDEN);
    }

    let mac: Mac
  
    try {
      mac = await this.prisma.mac.create({
        data: { 
          content: createMacDto.content, 
          User: {connect: { id: createMacDto.userId }} 
        },
      })
      
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException("mac alredy exists.", HttpStatus.CONFLICT);
      } else {
        throw new HttpException("Can't create mac.", HttpStatus.FORBIDDEN);
      }
    }

    return mac;
  }

  findAll() {
    try {
      return this.prisma.mac.findMany();
    } catch (error) {
      throw new Error()
    }
  }

  async findAllMacsByEnvironment(body: ReadEnvMacsDto) {
    const env = await this.prisma.environment.findFirst({
      where: { id: body.envId },
      include: { 
        admins: { include: { mac: true } },
        frequenters: { include: { mac: true } }
      }
    });

    if (!env) {
      throw new HttpException("Environment not found", HttpStatus.NOT_FOUND);
    }

    const macs: Mac[] = []

    env.admins.forEach(admin => {
      if (admin.mac) macs.push(admin.mac)
    })

    env.frequenters.forEach(frequenter => {
      if (frequenter.mac) macs.push(frequenter.mac)
    })

    try {
      return macs
    } catch (error) {
      throw new Error()
    }
  }

  findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Invalid Input. ID must be sent.');
    }

    return this.prisma.mac.findFirstOrThrow({
      where: { id }
    });
  }

  update(id: number, updateMacDto: UpdateMacDto, userId: number) {
    const validFields = ['content', 'userId'];
    const invalidFields = Object.keys(updateMacDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields provided: ${invalidFields.join(', ')}`,
      );
    }

    if (isNaN(id)) {
      throw new HttpException("Id must be a number", HttpStatus.BAD_REQUEST);
    }

    if (userId !== id) {
      throw new HttpException("Users only update their own macs", HttpStatus.UNAUTHORIZED);
    }

    try {
      return this.prisma.mac.update({
        where: { id },
        data: updateMacDto
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException("Mac not found", HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException("Can't update mac.", HttpStatus.FORBIDDEN);
      }
    }
  }

  remove(id: number, userId: number) {
    if (!id) {
      throw new BadRequestException('Invalid Input. ID must be sent.');
    }

    if (userId !== id) {
      throw new HttpException("Users only delete their own macs", HttpStatus.UNAUTHORIZED);
    }

    return this.prisma.mac.delete({
      where: { id }
    });
  }
}
