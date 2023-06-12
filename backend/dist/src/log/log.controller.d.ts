import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
export declare class LogController {
    private readonly logService;
    constructor(logService: LogService);
    create(createLogDto: CreateLogDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLogDto: UpdateLogDto): string;
    remove(id: string): string;
}
