import { IsHexadecimal, IsNotEmpty, IsUUID, Length } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateRfidDto {
  @IsHexadecimal()
  @IsNotEmpty()
  @Length(8, 16)
  @ApiProperty()
  tag: string
  
  @IsUUID()
  @ApiProperty()
  userId: string
}