import { IsString } from "class-validator"

export class CreateEnvironmentDto {
  @IsString()
  name: string

  @IsString()
  description?: string
}
