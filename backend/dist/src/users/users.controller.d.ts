import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRequest } from './interfaces/req-user';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, req: UserRequest): Promise<import(".prisma/client").User>;
    findAllAdmins(): Promise<(import(".prisma/client").User & {
        rfid: import(".prisma/client").Rfid;
    })[]>;
    findAllFrequenters(): Promise<(import(".prisma/client").User & {
        rfid: import(".prisma/client").Rfid;
    })[]>;
    findAllFrequentersByEnvironment(envId: string): Promise<(import(".prisma/client").User & {
        rfid: import(".prisma/client").Rfid;
    })[]>;
    findAllAdminsByEnvironment(envId: string): Promise<(import(".prisma/client").User & {
        rfid: import(".prisma/client").Rfid;
    })[]>;
    findOne(id: string, req: UserRequest): Promise<import(".prisma/client").User & {
        rfid: import(".prisma/client").Rfid;
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
    }>;
    update(id: string, role: string, updateUserDto: UpdateUserDto, req: UserRequest): Promise<import(".prisma/client").User>;
    remove(id: string): Promise<import(".prisma/client").User>;
}
