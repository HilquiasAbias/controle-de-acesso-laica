import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CaronteService } from './caronte.service';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CaronteValidationDto } from './dto/user-validate-pass.dto';

@Controller('caronte')
export class CaronteController {
  constructor(private readonly caronteService: CaronteService) {}

  @Post('validate')
  validate(
    @Body() caronteValidationDto: CaronteValidationDto
    ) {
    return this.caronteService.validateUser(caronteValidationDto)
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCaronteDto: CreateCaronteDto) { 
    return this.caronteService.create(createCaronteDto);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.caronteService.findAll();
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caronteService.findOne(+id);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaronteDto: UpdateCaronteDto) {
    return this.caronteService.update(+id, updateCaronteDto);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caronteService.remove(+id);
  }
}
