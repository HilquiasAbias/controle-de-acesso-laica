import { IsEmail, IsIn, IsMACAddress, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
//import { Roles } from "@prisma/client"

export class CreateUserDto {
  @IsString()
  name: string

  @Length(10, 14)
  registration: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  password: string

  @IsString()
  @IsIn(['ADMIN', 'FREQUENTER', 'ENVIRONMENT_MANAGER'])
  role: string // Roles

  @IsString()
  // @Length(30, 50)
  @IsOptional()
  tag?: string

  @IsMACAddress()
  @IsOptional()
  mac?: string

  @IsString()
  @IsOptional()
  envId?: string
}
