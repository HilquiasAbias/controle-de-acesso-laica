import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RfidModule } from './rfid/rfid.module';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    AuthModule, 
    RfidModule
  ]
})
export class AppModule { }
