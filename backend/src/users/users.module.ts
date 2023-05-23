import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TagsModule } from 'src/tags/tags.module';
import { BluetoothModule } from 'src/bluetooth/bluetooth.module';

@Module({
  imports: [
    PrismaModule,
    TagsModule,
    BluetoothModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
