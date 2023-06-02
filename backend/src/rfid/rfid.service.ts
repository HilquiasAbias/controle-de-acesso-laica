import { Injectable } from '@nestjs/common';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { UpdateRfidDto } from './dto/update-rfid.dto';

@Injectable()
export class RfidService {
  create(createRfidDto: CreateRfidDto) {
    return 'This action adds a new rfid';
  }

  findAll() {
    return `This action returns all rfid`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rfid`;
  }

  update(id: number, updateRfidDto: UpdateRfidDto) {
    return `This action updates a #${id} rfid`;
  }

  remove(id: number) {
    return `This action removes a #${id} rfid`;
  }
}
