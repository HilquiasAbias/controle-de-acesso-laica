import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  registration: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}