import { Injectable, HttpException, HttpStatus, BadRequestException, Body } from '@nestjs/common';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { UpdateRfidDto } from './dto/update-rfid.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Rfid, User } from '@prisma/client';
import { isUUID } from 'class-validator';

@Injectable()
export class RfidService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRfidDto: CreateRfidDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: createRfidDto.userId },
      include: { rfid: true }
    })

    if (user.rfid) {
      throw new HttpException('User already has a rfid', HttpStatus.FORBIDDEN);
    }

    let rfid: Rfid
  
    try {
      rfid = await this.prisma.rfid.create({
        data: { 
          tag: createRfidDto.tag, 
          User: {connect: { id: createRfidDto.userId }} 
        },
      })
      
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException("rfid alredy exists.", HttpStatus.CONFLICT);
      } else {
        throw new HttpException("Can't create rfid.", HttpStatus.FORBIDDEN);
      }
    }

    return rfid;
  }

  async findAll() {
    try {
      return await this.prisma.rfid.findMany({
        include: {
          User: {
            select: { name: true }
          }
        }
      });
    } catch (error) {
      throw new Error()
    }
  }

  async findAllTagsByEnvironment(envId: string) {
    if (!isUUID(envId)) {
      throw new HttpException("Invalid id input", HttpStatus.BAD_REQUEST);
    }

    const env = await this.prisma.environment.findFirst({
      where: { id: envId },
      include: { 
        admins: { include: { rfid: true } },
        frequenters: { include: { rfid: true } }
      }
    });

    if (!env) {
      throw new HttpException("Environment not found", HttpStatus.NOT_FOUND);
    }

    const rfid: Rfid[] = []

    env.admins.forEach(admin => {
      if (admin.rfid) rfid.push(admin.rfid)
    })

    env.frequenters.forEach(frequenter => {
      if (frequenter.rfid) rfid.push(frequenter.rfid)
    })

    try {
      return rfid
    } catch (error) {
      throw new Error()
    }
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException("Invalid id input", HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.rfid.findFirstOrThrow({
      where: { id }
    });
  }

  async update(id: string, updateRfidDto: UpdateRfidDto, requestUser: User) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id input', HttpStatus.BAD_REQUEST);
    }

    const validFields = ['tag', 'userId'];
    const invalidFields = Object.keys(updateRfidDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields provided: ${invalidFields.join(', ')}`,
      );
    }

    const rfid = await this.prisma.rfid.findFirstOrThrow({
      where: { id },
      include: { User: true }
    })

    if (requestUser.id !== rfid.User.id && rfid.User.role === 'ADMIN') {
      throw new HttpException("An admin cannot update another admin's rfid", HttpStatus.UNAUTHORIZED);
    }

    try {
      return await this.prisma.rfid.update({
        where: { id },
        data: updateRfidDto
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException("rfid not found", HttpStatus.NOT_FOUND);
      } else if (error.code === 'P2002') {
        throw new HttpException("This rfid already exists", HttpStatus.CONFLICT);
      } else {
        throw new HttpException("Can't update rfid.", HttpStatus.FORBIDDEN);
      }
    }
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException("Invalid id input", HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.rfid.delete({
      where: { id }
    });
  }
}
