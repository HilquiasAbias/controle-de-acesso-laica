import { RfidService } from './rfid.service';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { UpdateRfidDto } from './dto/update-rfid.dto';
import { UserRequest } from 'src/users/interfaces/req-user';
import { ReadEnvRfidDto } from './dto/read-env-rfid.dto';
export declare class RfidController {
    private readonly rfidService;
    constructor(rfidService: RfidService);
    create(createRfidDto: CreateRfidDto): Promise<import(".prisma/client").Rfid>;
    findAll(): Promise<import(".prisma/client").Rfid[]>;
    findAllByEnv(body: ReadEnvRfidDto): Promise<import(".prisma/client").Rfid[]>;
    findOne(id: string): Promise<import(".prisma/client").Rfid>;
    update(id: string, updateRfidDto: UpdateRfidDto, req: UserRequest): Promise<import(".prisma/client").Rfid>;
    remove(id: string): Promise<import(".prisma/client").Rfid>;
}
