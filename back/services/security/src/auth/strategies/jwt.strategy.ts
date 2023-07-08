import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject('USERS') private readonly usersService: ClientProxy) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "Minha barca não discrimina; ricos ou pobres, nobres ou plebeus, todos devem enfrentar minha passagem." // process.env.JWT_SECRET
    });
  }

  async validate(payload: { userId: string }) {
    const pattern = { cmd: 'get-one' }
    const user = await firstValueFrom(this.usersService.send(pattern, payload))

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}