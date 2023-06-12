import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddUserInEnvironmentDto } from './dto/add-user-environment.dto';
export declare class EnvironmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createEnvironmentDto: CreateEnvironmentDto): Promise<import(".prisma/client").Environment>;
    addUserInEnvironment(data: AddUserInEnvironmentDto): Promise<{
        status: number;
        message: string;
    }>;
    findAll(): Promise<(import(".prisma/client").Environment & {
        admins: import(".prisma/client").User[];
        frequenters: import(".prisma/client").User[];
        carontes: import(".prisma/client").Caronte[];
    })[]>;
    findOne(id: string): Promise<import(".prisma/client").Environment & {
        admins: import(".prisma/client").User[];
        frequenters: import(".prisma/client").User[];
        carontes: import(".prisma/client").Caronte[];
    }>;
    update(id: string, updateEnvironmentDto: UpdateEnvironmentDto): Promise<import(".prisma/client").Environment>;
    remove(id: string): Promise<import(".prisma/client").Environment>;
}
