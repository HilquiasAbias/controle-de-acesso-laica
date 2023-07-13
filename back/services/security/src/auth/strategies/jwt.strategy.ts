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
      secretOrKey: "Who's for the Rest from every pain and ill? Who's for the Lethe's plain? the Donkey-shearings? Who's for Kerberia? Taenarum? or the Ravens?" // process.env.JWT_SECRET
    });
  }

  async validate(payload: { userId: string }) {
    const pattern = { cmd: 'get-one-for-auth' }
    const user = await firstValueFrom(this.usersService.send(pattern, payload))

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}