import { PartialType } from '@nestjs/swagger';
import { CreateCaronteDto } from './create-caronte.dto';

export class UpdateCaronteDto extends PartialType(CreateCaronteDto) {}
