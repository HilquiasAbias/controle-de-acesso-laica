import { CreateLogDto } from './dto/create-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class LogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateLogDto): Promise<{
        created: boolean;
    }>;
    findAll(): Promise<import(".prisma/client").Log[]>;
    findAllByCaronte(id: string): Promise<import(".prisma/client").Log[]>;
    findOne(id: string): Promise<import(".prisma/client").Log>;
}
