import { PartialType } from '@nestjs/mapped-types';
import { CreateBluetoothDto } from './create-bluetooth.dto';

export class UpdateBluetoothDto extends PartialType(CreateBluetoothDto) {}
