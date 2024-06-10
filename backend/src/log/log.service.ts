import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchLogslDto } from './dto/search-logs.dto';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateLogDto) {
    try {
      return await this.prisma.log.create({ data });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async read(data: SearchLogslDto) {
    const mac = data.deviceMac;
    const topic = data.topic;
    const order = !data.order ? 'asc' : data.order;
    const type = !data.type ? 'INFO' : data.type;

    if (!topic && !mac) {
      throw new HttpException(
        'É necessário informar o MAC do dispositivo ou o tópico do log',
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      return await this.prisma.log.findMany({
        where: {
          deviceMac: data.deviceMac || undefined,
          topic: data.topic || undefined,
          type: type
        },
        orderBy: {
          createdAt: order
        },
        take: data?.pageSize,
        skip: data?.pageSize * data?.previous
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
