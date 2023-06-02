import { RfidService } from './rfid.service';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { UpdateRfidDto } from './dto/update-rfid.dto';
export declare class RfidController {
    private readonly rfidService;
    constructor(rfidService: RfidService);
    create(createRfidDto: CreateRfidDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRfidDto: UpdateRfidDto): string;
    remove(id: string): string;
}
