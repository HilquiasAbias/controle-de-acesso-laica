import { IsNumber } from "class-validator";

export class ReadEnvMacsDto {
  @IsNumber()
  envId: number
}