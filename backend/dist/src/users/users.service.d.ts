import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bluetooth, Tag, User } from '@prisma/client';
export declare const roundsOfHashing = 10;
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<(User & {
        tag: Tag;
        bluetooth: Bluetooth;
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
    })[]>;
    findOne(id: number): Promise<User & {
        tag: Tag;
        bluetooth: Bluetooth;
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<User>;
}
