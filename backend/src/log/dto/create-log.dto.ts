import { IsBoolean, IsIn, IsMACAddress, IsOptional, IsString } from "class-validator"

export type ObolType = 'DEVICE_MAC' | 'TAG_RFID' | 'USER_CREDENTIALS'
export type LogTypes = 'INFO' | 'WARN' | 'DEBUG'

export type DebugTypes = 'debug1' | 'debug2' | 'debug3'
export type WarnTypes = 'warn1' | 'warn2' | 'warn3'
export type InfoTypes = 'info1' | 'info2' | 'info3'


export class CreateLogDto {
  @IsMACAddress()
  caronteMac: string

  @IsString()
  carontePassword?: string

  @IsString()
  @IsOptional()
  userRegistration?: string

  @IsString()
  @IsOptional()
  userTag?: string

  @IsMACAddress()
  @IsOptional()
  userMac?: string

  // @IsString()
  // @IsIn(['DEVICE_MAC', 'TAG_RFID', 'USER_CREDENTIALS'])
  //obolType?: string

  @IsString()
  @IsIn(['INFO', 'WARN', 'DEBUG'])
  type: string

  @IsString()
  message: string
}
