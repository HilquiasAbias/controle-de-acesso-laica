import { PartialType } from '@nestjs/swagger';
import { CreateRfidDto } from './create-rfid.dto';

export class UpdateRfidDto extends PartialType(CreateRfidDto) {}
