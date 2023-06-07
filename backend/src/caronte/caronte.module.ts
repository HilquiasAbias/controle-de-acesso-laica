import { Module } from '@nestjs/common';
import { CaronteService } from './caronte.service';
import { CaronteController } from './caronte.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CaronteController],
  providers: [CaronteService]
})
export class CaronteModule {}
