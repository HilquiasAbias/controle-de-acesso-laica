import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bluetooth, RFID, User } from '@prisma/client';
export declare const roundsOfHashing = 10;
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto, requestUser: User): Promise<User>;
    findAllFrequenters(): Promise<(User & {
        RFID: RFID;
    })[]>;
    findAllFrequentersByEnvironment(envId: string): Promise<(User & {
        RFID: RFID;
    })[]>;
    findAllAdminsByEnvironment(envId: string): Promise<(User & {
        RFID: RFID;
    })[]>;
    findAllAdmins(): Promise<User[]>;
    findOne(id: string): Promise<User & {
        RFID: RFID;
        Bluetooth: Bluetooth;
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
    }>;
    update(id: string, role: string, updateUserDto: UpdateUserDto, requestUser: User): Promise<User>;
    remove(id: string): Promise<User>;
}
