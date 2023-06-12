import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class EnvironmentNotFoundResponseEntity {
  @ApiProperty()
  @ApiResponseProperty({ example: ['No Environment found', 'Environment not found'] })
  message: string
}