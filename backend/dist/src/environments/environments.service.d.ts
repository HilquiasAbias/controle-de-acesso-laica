import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class EnvironmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createEnvironmentDto: CreateEnvironmentDto): import(".prisma/client").Prisma.Prisma__EnvironmentClient<import(".prisma/client").Environment, never>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").Environment & {
        admins: import(".prisma/client").User[];
        frequenters: import(".prisma/client").User[];
        triggers: import(".prisma/client").Trigger[];
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__EnvironmentClient<import(".prisma/client").Environment & {
        admins: import(".prisma/client").User[];
        frequenters: import(".prisma/client").User[];
        triggers: import(".prisma/client").Trigger[];
    }, never>;
    update(id: number, updateEnvironmentDto: UpdateEnvironmentDto): import(".prisma/client").Prisma.Prisma__EnvironmentClient<import(".prisma/client").Environment, never>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__EnvironmentClient<import(".prisma/client").Environment, never>;
}
