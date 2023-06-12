import { CaronteService } from './caronte.service';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { ObolForCharonDto } from './dto/obol-caronte.dto';
export declare class CaronteController {
    private readonly caronteService;
    constructor(caronteService: CaronteService);
    obol(obolForCharonDto: ObolForCharonDto): Promise<{
        access: boolean;
    }>;
    create(createCaronteDto: CreateCaronteDto): Promise<import(".prisma/client").Caronte>;
    findAll(): Promise<import(".prisma/client").Caronte[]>;
    findAllByEnvironment(envId: string): Promise<import(".prisma/client").Caronte[]>;
    findOne(id: string): Promise<import(".prisma/client").Caronte>;
    update(id: string, updateCaronteDto: UpdateCaronteDto): Promise<import(".prisma/client").Caronte>;
    remove(id: string): Promise<import(".prisma/client").Caronte>;
}
