import { CreateBluetoothDto } from './dto/create-bluetooth.dto';
import { UpdateBluetoothDto } from './dto/update-bluetooth.dto';
export declare class BluetoothService {
    create(createBluetoothDto: CreateBluetoothDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBluetoothDto: UpdateBluetoothDto): string;
    remove(id: number): string;
}
