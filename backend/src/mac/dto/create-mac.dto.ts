import { IsMACAddress, IsNumber } from "class-validator";

export class CreateMacDto {
  @IsMACAddress()
  content: string

  @IsNumber()
  userId: number
}
