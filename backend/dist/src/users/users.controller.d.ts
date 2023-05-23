import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRequest } from './interfaces/req-user';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, req: UserRequest): Promise<import(".prisma/client").User>;
    findAllAdmins(): Promise<import(".prisma/client").User[]>;
    findAllFrequenters(): Promise<(import(".prisma/client").User & {
        tag: import(".prisma/client").Tag;
    })[]>;
    findAllFrequentersByEnvironment(envId: number): Promise<(import(".prisma/client").User & {
        tag: import(".prisma/client").Tag;
    })[]>;
    findAllAdminsByEnvironment(envId: number): Promise<(import(".prisma/client").User & {
        tag: import(".prisma/client").Tag;
    })[]>;
    findOne(id: string): Promise<import(".prisma/client").User & {
        tag: import(".prisma/client").Tag;
        bluetooth: import(".prisma/client").Bluetooth;
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
    }>;
    update(id: string, role: string, updateUserDto: UpdateUserDto, req: UserRequest): Promise<import(".prisma/client").User>;
    remove(id: string): Promise<import(".prisma/client").User>;
}
