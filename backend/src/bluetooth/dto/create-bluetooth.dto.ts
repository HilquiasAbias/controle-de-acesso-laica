import { IsMACAddress, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateBluetoothDto {
  @ApiProperty()
  @IsMACAddress()
  content: string

  @ApiProperty()
  @IsNumber()
  userId: number
}