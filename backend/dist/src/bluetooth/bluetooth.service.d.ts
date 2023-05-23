import { CreateBluetoothDto } from './dto/create-bluetooth.dto';
import { UpdateBluetoothDto } from './dto/update-bluetooth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bluetooth, User } from '@prisma/client';
import { ReadEnvMacsDto } from './dto/read-env-macs.dto';
export declare class BluetoothService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createBluetoothDto: CreateBluetoothDto, requestUser: User): Promise<Bluetooth>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<Bluetooth[]>;
    findAllMacsByEnvironment(body: ReadEnvMacsDto): Promise<Bluetooth[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__BluetoothClient<Bluetooth, never>;
    update(id: number, updateBluetoothDto: UpdateBluetoothDto, userId: number): import(".prisma/client").Prisma.Prisma__BluetoothClient<Bluetooth, never>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__TagClient<import(".prisma/client").Tag, never>;
}
