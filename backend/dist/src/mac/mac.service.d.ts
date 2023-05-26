import { CreateMacDto } from './dto/create-mac.dto';
import { UpdateMacDto } from './dto/update-mac.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Mac, User } from '@prisma/client';
import { ReadEnvMacsDto } from './dto/read-env-macs.dto';
export declare class MacService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createMacDto: CreateMacDto, requestUser: User): Promise<Mac>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<Mac[]>;
    findAllMacsByEnvironment(body: ReadEnvMacsDto): Promise<Mac[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__MacClient<Mac, never>;
    update(id: number, updateMacDto: UpdateMacDto, userId: number): import(".prisma/client").Prisma.Prisma__MacClient<Mac, never>;
    remove(id: number, userId: number): import(".prisma/client").Prisma.Prisma__MacClient<Mac, never>;
}
