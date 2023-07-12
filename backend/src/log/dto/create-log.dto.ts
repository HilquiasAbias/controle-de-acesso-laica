import { IsBoolean, IsIn, IsMACAddress, IsOptional, IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export type ObolType = 'DEVICE_MAC' | 'TAG_RFID' | 'USER_CREDENTIALS'
export type LogTypes = 'INFO' | 'WARN' | 'DEBUG'

export type DebugTypes = 'debug1' | 'debug2' | 'debug3'
export type WarnTypes = 'warn1' | 'warn2' | 'warn3'
export type InfoTypes = 'info1' | 'info2' | 'info3'


export class CreateLogDto {
  @IsMACAddress()
  @ApiProperty()
  caronteMac: string

  @IsString()
  @ApiProperty()
  carontePassword?: string

  @IsString()
  @ApiProperty()
  topic: string

  @IsString()
  @IsIn(['INFO', 'WARN', 'DEBUG'])
  @ApiProperty()
  type: string

  @IsString()
  @ApiProperty()
  message: string
}
