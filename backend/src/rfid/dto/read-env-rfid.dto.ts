import { IsNumber } from "class-validator";

export class ReadEnvRfidDto {
  @IsNumber()
  envId: string
}