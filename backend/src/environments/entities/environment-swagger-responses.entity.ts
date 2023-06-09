import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class EnvironmentBadRequestResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({example: [
    'User role is different of role provided',
    "envId should not be empty",
    "envId must be a UUID",
    "userId should not be empty",
    "userId must be a UUID",
    "role should not be empty",
    "role must be a string"
  ]})
  message: string
}

export class EnvironmentNotFoundResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({ example: ['No Environment found', 'Environment not found'] })
  message: string
}

export class EnvironmentNotFoundOnCreateResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({ example: 'Admin not found' })
  message: string
}

export class UserAddedEntity {
  @ApiProperty()
  added: true
}
