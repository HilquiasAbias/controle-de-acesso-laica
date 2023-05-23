import { IsMACAddress, IsNumber } from "class-validator";

export class CreateBluetoothDto {
  @IsMACAddress()
  content: string

  @IsNumber()
  userId: number
}
