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
        RFID: import(".prisma/client").RFID;
    })[]>;
    findAllFrequentersByEnvironment(envId: string): Promise<(import(".prisma/client").User & {
        RFID: import(".prisma/client").RFID;
    })[]>;
    findAllAdminsByEnvironment(envId: string): Promise<(import(".prisma/client").User & {
        RFID: import(".prisma/client").RFID;
    })[]>;
    findOne(id: string): Promise<import(".prisma/client").User & {
        RFID: import(".prisma/client").RFID;
        Bluetooth: import(".prisma/client").Bluetooth;
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
    }>;
    update(id: string, role: string, updateUserDto: UpdateUserDto, req: UserRequest): Promise<import(".prisma/client").User>;
    remove(id: string): Promise<import(".prisma/client").User>;
}
