import { Module } from '@nestjs/common';
import { CaronteService } from './caronte.service';
import { CaronteController } from './caronte.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EnvironmentsModule } from 'src/environments/environments.module';

@Module({
  imports: [
    PrismaModule,
    EnvironmentsModule,
    // LogModule
  ],
  controllers: [CaronteController],
  providers: [CaronteService]
})
export class CaronteModule {}
