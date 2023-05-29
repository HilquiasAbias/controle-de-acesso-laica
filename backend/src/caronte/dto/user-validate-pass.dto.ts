import { IsHexadecimal, IsIP, IsMACAddress, IsNumber, IsString, Length } from "class-validator";

export class CaronteValidationDto {
  @IsIP()
  ip: string

  @IsMACAddress()
  esp: string

  @IsString()
  carontePassword: string
  
  //@IsString()
  userPassword?: string

  //@IsString()
  userRegister?: string
  
  //@IsNumber()
  userId?: number
  
  //@IsMACAddress()
  userDeviceMac?: string

  //@IsHexadecimal()
  //@Length(8, 16)
  userTagRFID?: string
}
