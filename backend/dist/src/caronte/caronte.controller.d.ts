import { CaronteService } from './caronte.service';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { CaronteValidationDto } from './dto/user-validate-pass.dto';
export declare class CaronteController {
    private readonly caronteService;
    constructor(caronteService: CaronteService);
    validate(caronteValidationDto: CaronteValidationDto): Promise<{
        access: string;
    }>;
    create(createCaronteDto: CreateCaronteDto): Promise<import(".prisma/client").Caronte>;
    findAll(): Promise<import(".prisma/client").Caronte[]>;
    findOne(id: string): Promise<import(".prisma/client").Caronte>;
    update(id: string, updateCaronteDto: UpdateCaronteDto): Promise<import(".prisma/client").Caronte>;
    remove(id: string): Promise<import(".prisma/client").Caronte>;
}
