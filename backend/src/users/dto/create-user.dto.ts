import { IsHexadecimal, IsMACAddress, IsNumber, IsString, IsStrongPassword, Length } from "class-validator"
//import { Roles } from "@prisma/client"

export class CreateUserDto {
  @IsString()
  name: string

  @Length(10, 14)
  registration: string

  //@IsStrongPassword()
  @IsString()
  password: string

  @IsString()
  role: 'ADMIN' | 'FREQUENTER' | 'ENVIRONMENT-MANAGER' // Roles

  @IsString()
  @IsHexadecimal()
  @Length(4, 8)
  tag?: string

  @IsNumber()
  envId?: number
}
