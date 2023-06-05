import { CreateRfidDto } from './dto/create-rfid.dto';
import { UpdateRfidDto } from './dto/update-rfid.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Rfid, User } from '@prisma/client';
import { ReadEnvRfidDto } from './dto/read-env-rfid.dto';
export declare class RfidService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRfidDto: CreateRfidDto): Promise<Rfid>;
    findAll(): Promise<Rfid[]>;
    findAllTagsByEnvironment(body: ReadEnvRfidDto): Promise<Rfid[]>;
    findOne(id: string): Promise<Rfid>;
    update(id: string, updateRfidDto: UpdateRfidDto, requestUser: User): Promise<Rfid>;
    remove(id: string): Promise<Rfid>;
}
