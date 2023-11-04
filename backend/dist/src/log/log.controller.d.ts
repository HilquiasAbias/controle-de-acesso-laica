import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogController {
    private readonly logService;
    constructor(logService: LogService);
    create(createLogDto: CreateLogDto): Promise<import(".prisma/client").Log>;
    findAll(amount: string): Promise<import(".prisma/client").Log[]>;
    findAllByTopic(topic: string, amount: string): Promise<import(".prisma/client").Log[]>;
    findOne(id: string): Promise<import(".prisma/client").Log[]>;
    clear(topic: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
