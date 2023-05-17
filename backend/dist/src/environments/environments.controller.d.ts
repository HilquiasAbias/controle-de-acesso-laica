import { EnvironmentsService } from './environments.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class EnvironmentsController {
    private readonly environmentsService;
    private readonly usersService;
    constructor(environmentsService: EnvironmentsService, usersService: UsersService);
    create(createEnvironmentDto: CreateEnvironmentDto): Promise<import(".prisma/client").Environment>;
    createUserAndLinkEnvironment(createUserDto: CreateUserDto, envId: number): Promise<import(".prisma/client").User>;
    findAll(): Promise<(import(".prisma/client").Environment & {
        admins: import(".prisma/client").User[];
        frequenters: import(".prisma/client").User[];
        triggers: import(".prisma/client").Trigger[];
    })[]>;
    findOne(id: string): Promise<import(".prisma/client").Environment & {
        admins: import(".prisma/client").User[];
        frequenters: import(".prisma/client").User[];
        triggers: import(".prisma/client").Trigger[];
    }>;
    update(id: string, updateEnvironmentDto: UpdateEnvironmentDto): Promise<import(".prisma/client").Environment>;
    remove(id: string): Promise<import(".prisma/client").Environment>;
}
