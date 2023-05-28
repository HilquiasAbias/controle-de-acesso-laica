import { IsHexadecimal, IsIP, IsMACAddress, IsNumber, IsString, Length } from "class-validator";

export class UserValidatePassDto {
  @IsIP()
  ip: string

  @IsMACAddress()
  esp: string

  @IsString()
  password: string

  @IsNumber()
  userId: number
  
  @IsMACAddress()
  mac?: string

  @IsHexadecimal()
  @Length(8, 16)
  tag?: string

}