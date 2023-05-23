import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { EnvironmentsModule } from './environments/environments.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { BluetoothModule } from './bluetooth/bluetooth.module';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    EnvironmentsModule, 
    AuthModule, 
    TagsModule, 
    BluetoothModule
  ]
})
export class AppModule {}
