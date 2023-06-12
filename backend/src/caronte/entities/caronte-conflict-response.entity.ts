import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class CaronteConflictResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({example: 'Unique constraint failed on the field: ${}'})
  message: string
}
