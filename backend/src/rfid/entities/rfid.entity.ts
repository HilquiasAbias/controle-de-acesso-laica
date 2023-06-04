import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Rfid {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tag: string;

  @ApiPropertyOptional({ nullable: true })
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
