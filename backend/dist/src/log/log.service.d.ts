import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
export declare class LogService {
    create(createLogDto: CreateLogDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLogDto: UpdateLogDto): string;
    remove(id: number): string;
}
