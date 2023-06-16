import { IsHexadecimal, IsNotEmpty, IsString, IsUUID, Length, MaxLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateRfidDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100) // 
  @ApiProperty()
  tag: string
  
  @IsUUID()
  @ApiProperty()
  userId: string
}