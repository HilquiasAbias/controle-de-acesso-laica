import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchLogslDto } from './dto/search-logs.dto';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLogDto) {
    try {
      return await this.prisma.log.create({ data });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async read(data: SearchLogslDto) {
    try {
      return await this.prisma.log.findMany({
        where: {
          deviceMac: data.deviceMac,
        },
        orderBy: {
          createdAt: data.order === 'asc' ? 'asc' : 'desc'
        },
        take: data?.pageSize,
        skip: data?.pageSize * data?.previous
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
