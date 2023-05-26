import { PartialType } from '@nestjs/mapped-types';
import { CreateCaronteDto } from './create-caronte.dto';

export class UpdateCaronteDto extends PartialType(CreateCaronteDto) {}
