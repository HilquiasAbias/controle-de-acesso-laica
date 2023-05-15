import { EnvironmentsService } from './environments.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
export declare class EnvironmentsController {
    private readonly environmentsService;
    constructor(environmentsService: EnvironmentsService);
    create(createEnvironmentDto: CreateEnvironmentDto): import(".prisma/client").Prisma.Prisma__EnvironmentClient<import(".prisma/client").Environment, never>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").Environment & {
        admins: import(".prisma/client").User[];
        frequenters: import(".prisma/client").User[];
        triggers: import(".prisma/client").Trigger[];
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__EnvironmentClient<import(".prisma/client").Environment & {
        admins: import(".prisma/client").User[];
        frequenters: import(".prisma/client").User[];
        triggers: import(".prisma/client").Trigger[];
    }, never>;
    update(id: string, updateEnvironmentDto: UpdateEnvironmentDto): import(".prisma/client").Prisma.Prisma__EnvironmentClient<import(".prisma/client").Environment, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__EnvironmentClient<import(".prisma/client").Environment, never>;
}
