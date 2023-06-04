import { IsHexadecimal, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateRfidDto {
  @IsHexadecimal()
  @IsNotEmpty()
  @Length(8, 16)
  tag: string
  
  @IsString()
  userId: string
}