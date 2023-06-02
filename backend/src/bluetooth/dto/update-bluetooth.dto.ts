import { PartialType } from '@nestjs/swagger';
import { CreateBluetoothDto } from './create-bluetooth.dto';

export class UpdateBluetoothDto extends PartialType(CreateBluetoothDto) {}
