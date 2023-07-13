import { Injectable, Inject } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('SECURITY') private readonly securityService: ClientProxy) {}

  async login(loginDto: LoginDto) {
    const pattern = { cmd: 'login' }
    return this.securityService.send(pattern, loginDto)
  }
}
