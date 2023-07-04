import { ArrayNotEmpty, IsArray, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class UpdateUserGeneralDto {
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  userId?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string

  @IsString()
  @Length(10, 14)
  @IsNotEmpty()
  @IsOptional()
  registration?: string

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string
}
