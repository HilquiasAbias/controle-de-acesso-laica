import { IsMACAddress, IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
  @IsMACAddress()
  @ApiProperty()
  deviceMac: string

  @IsString()
  @ApiProperty()
  topic: string

  @IsString()
  @ApiProperty()
  type: string

  @IsString()
  @ApiProperty()
  message: string
}
