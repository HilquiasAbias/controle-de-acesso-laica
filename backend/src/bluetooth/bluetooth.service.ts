import { Injectable } from '@nestjs/common';
import { CreateBluetoothDto } from './dto/create-bluetooth.dto';
import { UpdateBluetoothDto } from './dto/update-bluetooth.dto';

@Injectable()
export class BluetoothService {
  create(createBluetoothDto: CreateBluetoothDto) {
    return 'This action adds a new bluetooth';
  }

  findAll() {
    return `This action returns all bluetooth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bluetooth`;
  }

  update(id: number, updateBluetoothDto: UpdateBluetoothDto) {
    return `This action updates a #${id} bluetooth`;
  }

  remove(id: number) {
    return `This action removes a #${id} bluetooth`;
  }
}
