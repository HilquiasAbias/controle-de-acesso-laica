import { Module } from '@nestjs/common';
import { MacService } from './mac.service';
import { MacController } from './mac.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MacController],
  providers: [MacService],
  exports: [MacService]
})
export class MacModule {}
