import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, IsIP, IsMACAddress, IsOptional, IsString, Length } from 'class-validator';

export class ObolForCharonDto {
  @ApiProperty()
  @IsIP()
  ip: string

  @ApiProperty()
  @IsMACAddress()
  esp: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  carontePassword: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  userRegistration: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  userPassword: string

  @ApiProperty()
  @IsMACAddress()
  @IsOptional()
  userDeviceMac: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  userTagRFID: string

}
