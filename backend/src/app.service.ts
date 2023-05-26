import { BadRequestException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from "./prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor (private readonly prisma: PrismaService) {}

  async teste(ip, params) {
    console.log(ip);
    
    if (ip !== params.ip) {
      throw new BadRequestException('Ip do cliente não é compatível com o fornecido na requisição')
    }

    const tag = await this.prisma.caronte.findUniqueOrThrow({
      where: { ip: params.ip },
      include: { Environment: true }
    })

    if (!tag) {
      throw new HttpException("Caronte not found", HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(tag.password, params.password);

    if (!isPasswordValid) {
      throw new HttpException("Invalid password", HttpStatus.UNAUTHORIZED);
    }

    console.log(tag);
    
    return {
      msg: 'Ok'
    }
  }
}