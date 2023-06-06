import { ApiProperty } from "@nestjs/swagger";
import { Environment } from "@prisma/client";

export class EnvironmentEntity implements Environment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class UserAddedEntity {
  successful: true
}
