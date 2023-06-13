import { Module } from '@nestjs/common';
import { CaronteService } from './caronte.service';
import { CaronteController } from './caronte.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogModule } from 'src/log/log.module';
import { LogService } from 'src/log/log.service';

@Module({
  imports: [PrismaModule, LogModule],
  controllers: [CaronteController],
  providers: [CaronteService, LogService]
})
export class CaronteModule {}
