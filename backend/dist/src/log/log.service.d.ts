import { CreateLogDto } from './dto/create-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Log } from '@prisma/client';
export declare class LogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateLogDto): Promise<Log>;
    findAll(take: number): Promise<Log[]>;
    findAllByTopic(topic: string, amount: number): Promise<Log[]>;
    findAllByCaronte(id: string): Promise<Log[]>;
    findOne(id: string): Promise<Log>;
    clear(topic: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
