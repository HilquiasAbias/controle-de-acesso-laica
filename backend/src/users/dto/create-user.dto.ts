import { IsString, IsStrongPassword, Length } from "class-validator"
//import { Roles } from "@prisma/client"

export class CreateUserDto {
  @IsString()
  name: string

  @Length(10, 14)
  registration: string

  //@IsStrongPassword()
  password: string

  @IsString()
  role: string // Roles

  @IsString()
  tag?: string

  @IsString()
  bluetooth?: string

  envId?: number
}
