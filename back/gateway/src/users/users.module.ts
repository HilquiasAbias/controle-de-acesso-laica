import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
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
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
