import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "Minha barca não discrimina; ricos ou pobres, nobres ou plebeus, todos devem enfrentar minha passagem.", // process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // e.g. 30s, 7d, 24h
    }),
    ClientsModule.register([
      {
        name: 'USERS',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 6001
        }
      },
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}