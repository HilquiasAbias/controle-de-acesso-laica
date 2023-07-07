import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller'; 
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'SECURITY',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 6002
        }
      },
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
