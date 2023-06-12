import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class CaronteIdParamInvalidResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({example: 'Invalid input id'})
  message: string
}
