import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
import { IAccessTime } from "src/interfaces/access-time";

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

  @ApiProperty()
  @IsOptional()
  accessTime?: IAccessTime[]
}