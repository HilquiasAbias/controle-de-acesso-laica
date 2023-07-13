import { IsArray, IsIn, IsOptional } from 'class-validator';

export class UpdateUserRolesDto {
  @IsArray()
  @IsIn(['ADMIN', 'FREQUENTER', 'ENVIRONMENT_MANAGER'], { each: true })
  @IsOptional()
  rolesToAdd?: string[];

  @IsArray()
  @IsIn(['ADMIN', 'FREQUENTER', 'ENVIRONMENT_MANAGER'], { each: true })
  @IsOptional()
  rolesToRemove?: string[];
}
