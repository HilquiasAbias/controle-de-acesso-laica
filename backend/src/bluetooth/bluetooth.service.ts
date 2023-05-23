import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateBluetoothDto } from './dto/create-bluetooth.dto';
import { UpdateBluetoothDto } from './dto/update-bluetooth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bluetooth, User } from '@prisma/client';
import { ReadEnvMacsDto } from './dto/read-env-macs.dto';

@Injectable()
export class BluetoothService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBluetoothDto: CreateBluetoothDto, requestUser: User) {
    if (requestUser.id !== createBluetoothDto.userId) {
      throw new HttpException('Users only changes their own macs', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: createBluetoothDto.userId },
      include: { bluetooth: true }
    })

    if (user.bluetooth) {
      throw new HttpException('User already has a mac', HttpStatus.FORBIDDEN);
    }

    let bluetooth: Bluetooth
  
    try {
      bluetooth = await this.prisma.bluetooth.create({
        data: { 
          content: createBluetoothDto.content, 
          User: {connect: { id: createBluetoothDto.userId }} 
        },
      })
      
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException("mac alredy exists.", HttpStatus.CONFLICT);
      } else {
        throw new HttpException("Can't create mac.", HttpStatus.FORBIDDEN);
      }
    }

    return bluetooth;
  }

  findAll() {
    try {
      return this.prisma.bluetooth.findMany();
    } catch (error) {
      throw new Error()
    }
  }

  async findAllMacsByEnvironment(body: ReadEnvMacsDto) {
    const env = await this.prisma.environment.findFirst({
      where: { id: body.envId },
      include: { 
        admins: { include: { bluetooth: true } },
        frequenters: { include: { bluetooth: true } }
      }
    });

    if (!env) {
      throw new HttpException("Environment not found", HttpStatus.NOT_FOUND);
    }

    const bluetooths: Bluetooth[] = []

    env.admins.forEach(admin => {
      if (admin.bluetooth) bluetooths.push(admin.bluetooth)
    })

    env.frequenters.forEach(frequenter => {
      if (frequenter.bluetooth) bluetooths.push(frequenter.bluetooth)
    })

    try {
      return bluetooths
    } catch (error) {
      throw new Error()
    }
  }

  findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Invalid Input. ID must be sent.');
    }

    return this.prisma.bluetooth.findUnique({
      where: { id }
    });
  }

  update(id: number, updateBluetoothDto: UpdateBluetoothDto, userId: number) {
    if (userId !== id) {
      throw new HttpException("Users only update their own macs", HttpStatus.UNAUTHORIZED);
    }

    const validFields = ['content', 'userId'];
    const invalidFields = Object.keys(updateBluetoothDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields provided: ${invalidFields.join(', ')}`,
      );
    }

    try {
      return this.prisma.bluetooth.update({
        where: { id },
        data: updateBluetoothDto
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException("Mac not found", HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException("Can't update mac.", HttpStatus.FORBIDDEN);
      }
    }
  }

  remove(id: number) {
    return this.prisma.tag.delete({
      where: { id }
    });
  }
}
