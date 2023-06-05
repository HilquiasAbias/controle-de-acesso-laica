import { IsNotEmpty, IsString, IsUUID } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnvironmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  description?: string

  @IsUUID()
  @ApiProperty()
  adminId?: string
}