import { CreateLogDto } from './dto/create-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class LogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateLogDto): Promise<import(".prisma/client").Log>;
    findAll(): Promise<import(".prisma/client").Log[]>;
    findAllByCaronte(caronteMac: string): Promise<import(".prisma/client").Log[]>;
    findAllByUser(userRegistration: string): Promise<import(".prisma/client").Log[]>;
    findOne(id: string): Promise<import(".prisma/client").Log>;
}
