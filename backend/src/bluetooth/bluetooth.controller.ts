import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BluetoothService } from './bluetooth.service';
import { CreateBluetoothDto } from './dto/create-bluetooth.dto';
import { UpdateBluetoothDto } from './dto/update-bluetooth.dto';

@Controller('bluetooth')
export class BluetoothController {
  constructor(private readonly bluetoothService: BluetoothService) {}

  @Post()
  create(@Body() createBluetoothDto: CreateBluetoothDto) {
    return this.bluetoothService.create(createBluetoothDto);
  }

  @Get()
  findAll() {
    return this.bluetoothService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bluetoothService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBluetoothDto: UpdateBluetoothDto) {
    return this.bluetoothService.update(+id, updateBluetoothDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bluetoothService.remove(+id);
  }
}
