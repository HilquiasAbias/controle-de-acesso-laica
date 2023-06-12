import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  registration: string;

  @ApiProperty({ required: false, nullable: true })
  mac: string | null;

  @ApiProperty()
  role: string;

  @ApiProperty({ required: false, nullable: true })
  environmentAdminId: string | null;

  @ApiProperty({ required: false, nullable: true })
  environmentFrequenterId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
