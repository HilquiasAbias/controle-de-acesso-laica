import { Controller, Get, Ip, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from "./app.service";

@Controller('caronte')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ip')
  getExample(@Req() request: Request) {
    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    return { ip_client: ip };
  }
}
