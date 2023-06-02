import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RfidService } from './rfid.service';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { UpdateRfidDto } from './dto/update-rfid.dto';

@Controller('rfid')
export class RfidController {
  constructor(private readonly rfidService: RfidService) {}

  @Post()
  create(@Body() createRfidDto: CreateRfidDto) {
    return this.rfidService.create(createRfidDto);
  }

  @Get()
  findAll() {
    return this.rfidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rfidService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRfidDto: UpdateRfidDto) {
    return this.rfidService.update(+id, updateRfidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rfidService.remove(+id);
  }
}
