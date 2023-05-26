import { PartialType } from '@nestjs/mapped-types';
import { CreateMacDto } from './create-mac.dto';

export class UpdateMacDto extends PartialType(CreateMacDto) {}
