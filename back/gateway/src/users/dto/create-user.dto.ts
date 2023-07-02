import { ArrayNotEmpty, IsArray, IsEmail, IsIn, IsMACAddress, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
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

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['ADMIN', 'FREQUENTER', 'ENVIRONMENT_MANAGER'], { each: true })
  roles: string[] // Roles

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
