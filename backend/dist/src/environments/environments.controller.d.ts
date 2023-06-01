import { EnvironmentsService } from './environments.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { AddUserInEnvironmentDto } from './dto/add-user-environment.dto';
export declare class EnvironmentsController {
    private readonly environmentsService;
    constructor(environmentsService: EnvironmentsService);
    create(createEnvironmentDto: CreateEnvironmentDto): Promise<import(".prisma/client").Environment>;
    addUserInEnvironment(addUserInEnvironmentDto: AddUserInEnvironmentDto): Promise<{
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
