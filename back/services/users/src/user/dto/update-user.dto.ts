import { IsEmail, IsIn, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string

  @Length(10, 14)
  registration: string

  @IsEmail()
  email?: string

  @IsString()
  password: string

  @IsString()
  @IsIn(['ADMIN', 'FREQUENTER', 'ENVIRONMENT_MANAGER'])
  role: string // Roles
}
