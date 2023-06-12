import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class CaronteNotFoundResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({example: 'No Caronte found'})
  message: string
}