import { CreateRfidDto } from './dto/create-rfid.dto';
import { UpdateRfidDto } from './dto/update-rfid.dto';
export declare class RfidService {
    create(createRfidDto: CreateRfidDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRfidDto: UpdateRfidDto): string;
    remove(id: number): string;
}
