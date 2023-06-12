import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaronteService } from './caronte.service';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { ObolForCharonDto } from './dto/obol-caronte.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CaronteEntity, CaronteResponseEntity } from './entities/caronte.entity'

@Controller('caronte')
@ApiTags('Caronte')
export class CaronteController {
  constructor(private readonly caronteService: CaronteService) {}

  @Post('obol')
  @ApiOperation({ description: 'Endpoint uma moeda para caronte' })
  @ApiOkResponse({ type: CaronteResponseEntity })
  obol(
    @Body() obolForCharonDto: ObolForCharonDto
    ) {
    return this.caronteService.anObolForCharon(obolForCharonDto)
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para cadastrar caronte' })
  @ApiCreatedResponse({ type: CaronteEntity })
  create(@Body() createCaronteDto: CreateCaronteDto) {
    return this.caronteService.create(createCaronteDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para buscar todos os carontes' })
  @ApiOkResponse({ type: CaronteEntity, isArray: true })
  findAll() {
    return this.caronteService.findAll();
  }

  @Get('environment/:envId')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para buscar todos os carontes de um ambiente' })
  @ApiOkResponse({ type: CaronteEntity, isArray: true })
  findAllByEnvironment(@Param('envId') envId: string) {
    return this.caronteService.findAllByEnvironment(envId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para buscar um caronte' })
  @ApiOkResponse({ type: CaronteEntity })
  findOne(@Param('id') id: string) {
    return this.caronteService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para atualizar um caronte' })
  @ApiOkResponse({ type: CaronteEntity })
  update(@Param('id') id: string, @Body() updateCaronteDto: UpdateCaronteDto) {
    return this.caronteService.update(id, updateCaronteDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para remover um caronte' })
  @ApiOkResponse({ type: CaronteEntity })
  remove(@Param('id') id: string) {
    return this.caronteService.remove(id);
  }
}
