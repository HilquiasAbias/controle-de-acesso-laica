import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

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

    return this.prisma.log.create({ data });
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
