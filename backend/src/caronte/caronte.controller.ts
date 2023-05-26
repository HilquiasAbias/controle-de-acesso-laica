import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CaronteService } from './caronte.service';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Roles('ADMIN') // UserRoles.ADMIN
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('caronte')
export class CaronteController {
  constructor(private readonly caronteService: CaronteService) {}

  @Post()
  create(@Body() createCaronteDto: CreateCaronteDto) { 
    return this.caronteService.create(createCaronteDto);
  }

  @Get()
  findAll() {
    return this.caronteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caronteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaronteDto: UpdateCaronteDto) {
    return this.caronteService.update(+id, updateCaronteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caronteService.remove(+id);
  }
}
