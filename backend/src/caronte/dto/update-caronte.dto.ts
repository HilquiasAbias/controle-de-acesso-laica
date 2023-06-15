import { ApiProperty } from "@nestjs/swagger";
import { IsIP, IsMACAddress, IsString } from "class-validator";


export class UpdateCaronteDto {
  @ApiProperty()
  @IsIP()
  ip: string;

  @ApiProperty()
  @IsMACAddress()
  esp: string

  @ApiProperty()
  @IsString()
  password: string
}
