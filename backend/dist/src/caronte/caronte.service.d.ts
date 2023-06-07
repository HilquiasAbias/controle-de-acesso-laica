import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CaronteService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCaronteDto: CreateCaronteDto): Promise<import(".prisma/client").Caronte>;
    findAll(): Promise<import(".prisma/client").Caronte[]>;
    findAllByEnvironment(envId: string): Promise<import(".prisma/client").Caronte[]>;
    findOne(id: string): Promise<import(".prisma/client").Caronte>;
    update(id: string, updateCaronteDto: UpdateCaronteDto): Promise<string>;
    remove(id: string): Promise<string>;
}
