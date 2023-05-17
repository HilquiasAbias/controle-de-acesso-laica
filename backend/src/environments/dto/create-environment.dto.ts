import { IsString } from "class-validator"

export abstract class triggerData {
  @IsString()
  ip: string

  @IsString()
  password: string
}

export abstract class frequenterData {
  @IsString()
  ip: string

  @IsString()
  password: string
}

export class CreateEnvironmentDto {
  @IsString()
  name: string

  @IsString()
  description?: string

  adminId?: number
}
