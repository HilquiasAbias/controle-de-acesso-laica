import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsMACAddress, IsString, IsUUID } from 'class-validator';

export class CreateCaronteDto {
  @ApiProperty()
  @IsIP()
  ip: string;

  @ApiProperty()
  @IsMACAddress()
  esp: string

  @ApiProperty()
  @IsUUID()
  environmentId: string
}
