import { ApiProperty } from "@nestjs/swagger";
import { Rfid } from "@prisma/client";

export class RfidEntity implements Rfid {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tag: string;

  @ApiProperty({ required: false, nullable: true })
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
