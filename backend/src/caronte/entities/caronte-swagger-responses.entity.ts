import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class CaronteBadRequestResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({example: [
    'Invalid input data for ${}',
    'Required field missing: ${}',
    'Invalid field value: ${}',
    'Invalid fields provided: [${}...]',
    'ip must be an ip address',
    'esp must be a MAC Address'
  ]})
  message: string
}

export class CaronteConflictResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({example: 'Unique constraint failed on the field: ${}'})
  message: string
}

export class CaronteIdParamInvalidResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({example: 'Invalid input id'})
  message: string
}

export class CaronteNotFoundResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({example: 'No Caronte found'})
  message: string
}

export class CaronteUnauthorizedResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({ example: [
    'Unauthorized caronte access', 
    'Unauthorized user access', 
    'Unauthorized'
  ]})
  message: string
}

export class CaronteValidResponseEntity {
  @ApiProperty()
  access: true
}
