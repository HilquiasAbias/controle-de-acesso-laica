import { ApiProperty } from "@nestjs/swagger";
import { Caronte } from "@prisma/client";

export class CaronteEntity implements Caronte {
  @ApiProperty()
  id: string;

  @ApiProperty()
  ip: string;

  @ApiProperty()
  esp: string

  @ApiProperty()
  environmentId: string
}
