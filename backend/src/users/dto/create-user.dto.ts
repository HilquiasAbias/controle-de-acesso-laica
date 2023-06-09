import { IsHexadecimal, IsMACAddress, IsOptional, IsString, IsStrongPassword, Length } from "class-validator"
//import { Roles } from "@prisma/client"
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @Length(10, 14)
  registration: string

  @ApiProperty()
  //@IsStrongPassword()
  @IsString()
  password: string

  @ApiProperty()
  @IsString()
  role: 'ADMIN' | 'FREQUENTER' | 'ENVIRONMENT-MANAGER' // Roles

  @ApiProperty()
  @IsString()
  @IsHexadecimal()
  @Length(4, 8)
  @IsOptional()
  tag?: string

  @ApiProperty()
  @IsMACAddress()
  @IsOptional()
  mac?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  envId?: string
}
