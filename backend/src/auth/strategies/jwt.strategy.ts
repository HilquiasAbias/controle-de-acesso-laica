import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "algo-muito-secreto" // process.env.JWT_SECRET
    });
  }

  async validate(payload: { userId: string }) {
    const user = await this.usersService.getOneForLogin(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}