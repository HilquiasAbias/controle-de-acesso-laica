import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaronteService } from './caronte.service';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { ObolForCharonDto } from './dto/obol-caronte.dto';

@Controller('caronte')
export class CaronteController {
  constructor(private readonly caronteService: CaronteService) {}

  @Post('obol')
  obol(
    @Body() obolForCharonDto: ObolForCharonDto
    ) {
    return this.caronteService.anObolForCharon(obolForCharonDto)
  }

  @Post()
  create(@Body() createCaronteDto: CreateCaronteDto) {
    return this.caronteService.create(createCaronteDto);
  }

  @Get()
  findAll() {
    return this.caronteService.findAll();
  }

  @Get('environment/:envId')
  findAllByEnvironment(@Param('envId') envId: string) {
    return this.caronteService.findAllByEnvironment(envId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caronteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaronteDto: UpdateCaronteDto) {
    return this.caronteService.update(id, updateCaronteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caronteService.remove(id);
  }
}
