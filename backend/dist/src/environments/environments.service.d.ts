import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class EnvironmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createEnvironmentDto: CreateEnvironmentDto): Promise<import(".prisma/client").Environment>;
    createAndAddUser(data: any, envId: number): Promise<void>;
    findAll(): Promise<(import(".prisma/client").Environment & {
        admins: import(".prisma/client").User[];
        frequenters: import(".prisma/client").User[];
        triggers: import(".prisma/client").Trigger[];
    })[]>;
    findOne(id: number): Promise<import(".prisma/client").Environment & {
        admins: import(".prisma/client").User[];
        frequenters: import(".prisma/client").User[];
        triggers: import(".prisma/client").Trigger[];
    }>;
    update(id: number, updateEnvironmentDto: UpdateEnvironmentDto): Promise<import(".prisma/client").Environment>;
    remove(id: number): Promise<import(".prisma/client").Environment>;
}
