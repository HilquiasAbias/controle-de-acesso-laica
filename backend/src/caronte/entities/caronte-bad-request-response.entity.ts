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