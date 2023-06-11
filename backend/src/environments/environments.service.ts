import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddUserInEnvironmentDto } from './dto/add-user-environment.dto';
import { isUUID } from 'class-validator';
import { DateTime } from 'luxon';

@Injectable()
export class EnvironmentsService {
  constructor (private readonly prisma: PrismaService) {}

  async create(createEnvironmentDto: CreateEnvironmentDto) {
    const env = await this.prisma.environment.create({
      data: {
        name: createEnvironmentDto.name,
        description: createEnvironmentDto.description,
        admins: createEnvironmentDto.adminId ? { connect: { id: createEnvironmentDto.adminId } } : undefined
      }
    });

    return env
  }

  async addUserInEnvironment(data: AddUserInEnvironmentDto) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: data.userId },
    })
    
    if (user.role !== data.role) {
      throw new HttpException('User role is different of role provided', HttpStatus.BAD_REQUEST);
    }
    
    try {
      if (user.role === 'ADMIN') {
        await this.prisma.environment.update({
          where: { id: data.envId },
          data: {
            admins: { connect: { id: data.userId } }
          }
        })
      } else {
        await this.prisma.environment.update({
          where: { id: data.envId },
          data: {
            frequenters: { connect: { id: data.userId } }
          }
        })
      }

      if (data.accessTime && data.role === 'FREQUENTER') {
        await Promise.all(
          data.accessTime.map(async (accessTime) => {
            const { day, startTime, endTime } = accessTime;
  
            await this.prisma.accessTime.create({
              data: {
                userId: user.id,
                dayOfWeek: day,
                startTime: DateTime.fromFormat(startTime, 'HH:mm:ss').toISO(),
                endTime: DateTime.fromFormat(endTime, 'HH:mm:ss').toISO(),
              }
            })
          })
        );
      }
  

      return {
        status: 201,
        message: 'User successfully added.'
      }
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException("Can't add user", HttpStatus.FORBIDDEN);
      }
    }
  }

  async findAll() {
    return await this.prisma.environment.findMany({
      include: {
        admins: true,
        frequenters: true,
        carontes: true
      }
    });
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException("Invalid id input", HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.environment.findFirstOrThrow({
      where: { id },
      include: {
        admins: true,
        frequenters: true,
        carontes: true
      }
    });
  }

  async update(id: string, updateEnvironmentDto: UpdateEnvironmentDto) {
    if (!isUUID(id)) {
      throw new HttpException("Invalid id input", HttpStatus.BAD_REQUEST);
    }

    const validFields = ['name', 'description', 'adminId'];
    const invalidFields = Object.keys(updateEnvironmentDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new HttpException(`Invalid fields provided: ${invalidFields.join(', ')}`, HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.environment.update({
      data: updateEnvironmentDto,
      where: { id }
    });
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException("Invalid id input", HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.environment.delete({
      where: { id }
    });
  }
}