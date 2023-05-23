import { IsNumber } from "class-validator";

export class ReadEnvTagsDto {
  @IsNumber()
  envId: number
}