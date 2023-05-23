import { Module } from '@nestjs/common';
import { BluetoothService } from './bluetooth.service';
import { BluetoothController } from './bluetooth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BluetoothController],
  providers: [BluetoothService],
  exports: [BluetoothService]
})
export class BluetoothModule {}
