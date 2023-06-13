import { ApiProperty } from "@nestjs/swagger";
import { Log } from "@prisma/client";

export class LogEntity implements Log {
  @ApiProperty()
  id: string

  @ApiProperty()
  caronteMac: string

  @ApiProperty({ required: false, nullable: true })
  userRegistration: string

  @ApiProperty()
  type: string

  @ApiProperty()
  message: string

  @ApiProperty()
  obolType: string

  @ApiProperty()
  createdAt: Date
}
