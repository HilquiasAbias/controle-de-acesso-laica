import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TagsModule } from 'src/tags/tags.module';
import { MacModule } from 'src/mac/mac.module';

@Module({
  imports: [
    PrismaModule,
    TagsModule,
    MacModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
