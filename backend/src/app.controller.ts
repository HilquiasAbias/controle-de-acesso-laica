import { Controller, Get, Ip, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from "./app.service";

@Controller('caronte')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('keep-alive')
  teste(@Ip() ip, @Param() params: string[]) {
    return this.appService.teste(ip, params)
  }

  @Get("ip")
  getIpAddress(@Req() request: Request) {
    const ip = request.ip
    
    console.log(ip);

    if (ip.startsWith('::ffff')) {
      return {
        ip_client: ip.slice(7)
      };
    }
    
    return {
      ip_client: ip
    };
  }

  // @Get("ip")
  // getIpAddress(@RealIP() ip: string) {
  //   console.log(ip);

  //   if (ip.startsWith('::ffff')) {
  //     return {
  //       ip_client: ip.slice(7)
  //     };
  //   }
    
  //   return {
  //     ip_client: ip
  //   };
  // }
}