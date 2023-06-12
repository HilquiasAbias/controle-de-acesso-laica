import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class CaronteUnauthorizedResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({ example: [
    'Unauthorized caronte access', 
    'Unauthorized user access', 
    'Unauthorized'
  ]})
  message: string
}
