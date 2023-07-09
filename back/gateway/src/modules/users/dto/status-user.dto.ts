import { IsIn, IsString } from "class-validator";

export class UserStatusDto {
  @IsIn(['ACTIVATE', 'DEACTIVATE'])
  action: string
}