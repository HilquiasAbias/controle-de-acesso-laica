import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
export declare const roundsOfHashing = 10;
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto, requestUser: User): Promise<User>;
    findAllFrequenters(): Promise<(User & {
        rfid: import(".prisma/client").Rfid;
    })[]>;
    findAllFrequentersByEnvironment(envId: string): Promise<(User & {
        rfid: import(".prisma/client").Rfid;
    })[]>;
    findAllAdminsByEnvironment(envId: string): Promise<(User & {
        rfid: import(".prisma/client").Rfid;
    })[]>;
    findAllAdmins(): Promise<(User & {
        rfid: import(".prisma/client").Rfid;
    })[]>;
    findOne(id: string): Promise<User & {
        rfid: import(".prisma/client").Rfid;
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
    }>;
    updateWithoutCheckUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    frequenterSelfUpdate(id: string, updateUserDto: UpdateUserDto, requestUser: User): Promise<User>;
    update(id: string, role: string, updateUserDto: UpdateUserDto, requestUser: User): Promise<User>;
    remove(id: string): Promise<User>;
}
