import { ArrayNotEmpty, IsArray, IsIn, IsUUID } from 'class-validator';

export class UpdateUserRolesDto {
  @IsUUID()
  userId: string

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['ADMIN', 'FREQUENTER', 'ENVIRONMENT_MANAGER'], { each: true })
  rolesToAdd?: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['ADMIN', 'FREQUENTER', 'ENVIRONMENT_MANAGER'], { each: true })
  rolesToRemove?: string[];
}
