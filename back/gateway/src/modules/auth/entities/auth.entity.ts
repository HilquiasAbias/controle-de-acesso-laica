import { IsJWT } from "class-validator";

export class AuthEntity {
  @IsJWT()
  accessToken: string;
}