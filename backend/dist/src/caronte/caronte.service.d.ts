import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CaronteValidationDto } from './dto/user-validate-pass.dto';
import { User } from '@prisma/client';
export declare class CaronteService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findUserByTag(tag: string, envId: number): Promise<User>;
    findUserByMac(mac: string, envId: number): Promise<User>;
    findUserByData(registration: string, password: string, envId: number): Promise<User>;
    validateUser(userValidatePass: CaronteValidationDto): Promise<{
        access: string;
    }>;
    create(createCaronteDto: CreateCaronteDto): Promise<import(".prisma/client").Caronte>;
    findAll(): Promise<import(".prisma/client").Caronte[]>;
    findOne(id: number): Promise<import(".prisma/client").Caronte>;
    update(id: number, updateCaronteDto: UpdateCaronteDto): Promise<import(".prisma/client").Caronte>;
    remove(id: number): Promise<import(".prisma/client").Caronte>;
}
