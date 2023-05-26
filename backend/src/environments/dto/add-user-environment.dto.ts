import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class AddUserInEnvironmentDto {
  @IsNumber()
  @IsNotEmpty()
  envId: number

  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsString()
  @IsNotEmpty()
  role: string
}