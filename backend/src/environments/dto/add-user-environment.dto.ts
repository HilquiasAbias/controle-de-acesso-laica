import { IsNotEmpty, IsString, IsUUID } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class AddUserInEnvironmentDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  envId: string

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  userId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  role: string
}