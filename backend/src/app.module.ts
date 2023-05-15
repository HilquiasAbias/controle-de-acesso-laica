import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { EnvironmentsModule } from './environments/environments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    EnvironmentsModule, AuthModule
  ]
})
export class AppModule {}
