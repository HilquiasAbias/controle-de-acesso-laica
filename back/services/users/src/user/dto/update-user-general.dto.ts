import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

export class UpdateUserGeneralDto {
  @IsString()
  name: string

  @Length(10, 14)
  registration: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}
