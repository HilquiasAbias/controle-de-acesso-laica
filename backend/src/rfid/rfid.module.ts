import { Module } from '@nestjs/common';
import { RfidService } from './rfid.service';
import { RfidController } from './rfid.controller';

@Module({
  controllers: [RfidController],
  providers: [RfidService]
})
export class RfidModule {}
