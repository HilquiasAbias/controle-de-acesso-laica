import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Mac, Tag, User } from '@prisma/client';
import { TagsService } from 'src/tags/tags.service';
import { MacService } from 'src/mac/mac.service';
export declare const roundsOfHashing = 10;
export declare class UsersService {
    private readonly prisma;
    private readonly Tags;
    private readonly Macs;
    constructor(prisma: PrismaService, Tags?: TagsService, Macs?: MacService);
    create(createUserDto: CreateUserDto, requestUser: User): Promise<User>;
    findAllFrequenters(): Promise<(User & {
        tag: Tag;
    })[]>;
    findAllFrequentersByEnvironment(envId: number): Promise<(User & {
        tag: Tag;
    })[]>;
    findAllAdminsByEnvironment(envId: number): Promise<(User & {
        tag: Tag;
    })[]>;
    findAllAdmins(): Promise<User[]>;
    findOne(id: number): Promise<User & {
        tag: Tag;
        mac: Mac;
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
    }>;
    update(id: number, role: string, updateUserDto: UpdateUserDto, requestUser: User): Promise<User>;
    remove(id: number): Promise<User>;
}
