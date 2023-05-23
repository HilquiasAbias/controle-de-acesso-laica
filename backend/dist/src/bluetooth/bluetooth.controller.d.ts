import { BluetoothService } from './bluetooth.service';
import { CreateBluetoothDto } from './dto/create-bluetooth.dto';
import { UpdateBluetoothDto } from './dto/update-bluetooth.dto';
import { UserRequest } from 'src/users/interfaces/req-user';
import { ReadEnvMacsDto } from './dto/read-env-macs.dto';
export declare class BluetoothController {
    private readonly bluetoothService;
    constructor(bluetoothService: BluetoothService);
    create(createBluetoothDto: CreateBluetoothDto, req: UserRequest): Promise<import(".prisma/client").Bluetooth>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Bluetooth[]>;
    findAllByEnv(body: ReadEnvMacsDto): Promise<import(".prisma/client").Bluetooth[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__BluetoothClient<import(".prisma/client").Bluetooth, never>;
    update(id: string, updateBluetoothDto: UpdateBluetoothDto, req: UserRequest): import(".prisma/client").Prisma.Prisma__BluetoothClient<import(".prisma/client").Bluetooth, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TagClient<import(".prisma/client").Tag, never>;
}
