import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogController {
    private readonly logService;
    constructor(logService: LogService);
    create(createLogDto: CreateLogDto): Promise<import(".prisma/client").Log>;
    findAll(): Promise<import(".prisma/client").Log[]>;
    findOne(id: string): Promise<import(".prisma/client").Log[]>;
}
