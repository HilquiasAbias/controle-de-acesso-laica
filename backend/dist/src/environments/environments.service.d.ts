import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddUserInEnvironmentDto } from './dto/add-user-environment.dto';
import { User } from '@prisma/client';
export declare class EnvironmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createEnvironmentDto: CreateEnvironmentDto): Promise<import(".prisma/client").Environment>;
    addUserInEnvironment(data: AddUserInEnvironmentDto): Promise<{
        status: number;
        message: string;
    }>;
    findAll(): Promise<(import(".prisma/client").Environment & {
        admins: User[];
        frequenters: User[];
        triggers: import(".prisma/client").Caronte[];
    })[]>;
    findOne(id: number): Promise<import(".prisma/client").Environment & {
        admins: User[];
        frequenters: User[];
        triggers: import(".prisma/client").Caronte[];
    }>;
    update(id: number, updateEnvironmentDto: UpdateEnvironmentDto): Promise<import(".prisma/client").Environment>;
    remove(id: number): Promise<import(".prisma/client").Environment>;
}
