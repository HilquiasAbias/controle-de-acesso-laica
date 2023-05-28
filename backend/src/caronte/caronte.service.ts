import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { roundsOfHashing } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CaronteService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser()

  async create(createCaronteDto: CreateCaronteDto) {
    const hashedPassword = await bcrypt.hash(
      createCaronteDto.password,
      roundsOfHashing,
    );

    try {
      return await this.prisma.caronte.create({
        data: {
          ip: createCaronteDto.ip,
          esp: createCaronteDto.esp,
          password: hashedPassword,
          Environment: {
            connect: { id: createCaronteDto.environmentId }
          }
        }
      }) 
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException("Caronte alredy exists.", HttpStatus.CONFLICT);
      } else if (error.code === 'P2025') {
        throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException("Can't create caronte.", HttpStatus.FORBIDDEN);
      }
    }
  }

  async findAll() {
    try {
      return await this.prisma.caronte.findMany()
    } catch (error) {
      throw new HttpException("Something goes wrong", HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new HttpException('Invalid Input. ID must be sent', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.caronte.findFirstOrThrow({
      where: { id }
    });
  }

  async update(id: number, updateCaronteDto: UpdateCaronteDto) {
    if (!id) {
      throw new HttpException('Invalid Input. ID must be sent', HttpStatus.BAD_REQUEST);
    }
    
    const validFields = ['ip', 'esp', 'password', 'environmentId'];
    const invalidFields = Object.keys(updateCaronteDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields provided: ${invalidFields.join(', ')}`,
      );
    }

    if (updateCaronteDto.password) {
      updateCaronteDto.password = await bcrypt.hash(
        updateCaronteDto.password,
        roundsOfHashing,
      );
    }

    try {
      return await this.prisma.caronte.update({
        where: { id },
        data: updateCaronteDto
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException("Environment not found", HttpStatus.NOT_FOUND);
      } else if (error.code === 'P2002') {
        throw new HttpException("This caronte already exists", HttpStatus.CONFLICT);
      } else {
        throw new HttpException("Can't update caronte.", HttpStatus.FORBIDDEN);
      }
    }
  }

  async remove(id: number) {
    if (isNaN(id)) {
      throw new HttpException("Id must be a number", HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.caronte.delete({
      where: { id }
    });
  }
}
