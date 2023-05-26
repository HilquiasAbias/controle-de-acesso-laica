import { IsIP, IsMACAddress, IsNumber, IsString } from "class-validator";

export class CreateCaronteDto {
  @IsIP()
  ip: string

  @IsMACAddress()
  esp: string

  @IsString()
  password: string

  @IsNumber()
  environmentId?: number
}
