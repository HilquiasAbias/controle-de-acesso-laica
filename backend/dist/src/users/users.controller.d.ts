import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").User>;
    findAll(): Promise<(import(".prisma/client").User & {
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
        tag: import(".prisma/client").Tag;
        bluetooth: import(".prisma/client").Bluetooth;
    })[]>;
    findOne(id: string): Promise<import(".prisma/client").User & {
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
        tag: import(".prisma/client").Tag;
        bluetooth: import(".prisma/client").Bluetooth;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").User>;
    remove(id: string): Promise<import(".prisma/client").User>;
}
