import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS') private readonly usersService: ClientProxy, 
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const pattern = { cmd: 'get-one-by-registration' }
    const payload = loginDto.registration

    let user: User

    try {
      user = await firstValueFrom(this.usersService.send(pattern, payload))
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RpcException({
          statusCode: 404,
          message: error.message,
          error: 'Not Found',
        })
      }
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new RpcException({
        statusCode: 401,
        message: 'Invalid password',
        error: 'Unauthorized',
      })
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
