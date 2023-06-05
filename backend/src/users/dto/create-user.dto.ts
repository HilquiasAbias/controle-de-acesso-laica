import { IsHexadecimal, IsMACAddress, IsString, IsStrongPassword, Length } from "class-validator"
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
  tag?: string

  @ApiProperty()
  @IsMACAddress()
  mac?: string

  @ApiProperty()
  @IsString()
  envId?: string
}
