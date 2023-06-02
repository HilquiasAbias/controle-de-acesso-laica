import { BluetoothService } from './bluetooth.service';
import { CreateBluetoothDto } from './dto/create-bluetooth.dto';
import { UpdateBluetoothDto } from './dto/update-bluetooth.dto';
export declare class BluetoothController {
    private readonly bluetoothService;
    constructor(bluetoothService: BluetoothService);
    create(createBluetoothDto: CreateBluetoothDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBluetoothDto: UpdateBluetoothDto): string;
    remove(id: string): string;
}
