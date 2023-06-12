import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaronteService } from './caronte.service';
import { CreateCaronteDto } from './dto/create-caronte.dto';
import { UpdateCaronteDto } from './dto/update-caronte.dto';
import { ObolForCharonDto } from './dto/obol-caronte.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CaronteEntity } from './entities/caronte.entity'
import {CaronteValidResponseEntity} from './entities/caronte-valid-response.entity';
import {CaronteUnauthorizedResponseEntity} from './entities/caronte-unauthorized-response.entity';
import {CaronteBadRequestResponseEntity} from './entities/caronte-bad-request-response.entity';
import {CaronteConflictResponseEntity} from './entities/caronte-conflict-response.entity';
import {CaronteNotFoundResponseEntity} from './entities/caronte-not-found-response.entity';
import {CaronteIdParamInvalidResponseEntity} from './entities/caronte-invalid-id-param-response.entity';

@Controller('caronte')
@ApiTags('Caronte')
export class CaronteController {
  constructor(private readonly caronteService: CaronteService) {}
  
  @Post('obol')
  @ApiOperation({ description: 'Endpoint uma moeda para caronte' })
  @ApiOkResponse({ type: CaronteValidResponseEntity })
  @ApiUnauthorizedResponse({type: CaronteUnauthorizedResponseEntity})
  @ApiBadRequestResponse({ type: CaronteBadRequestResponseEntity })
  obol(
    @Body() obolForCharonDto: ObolForCharonDto
    ) {
    return this.caronteService.anObolForCharon(obolForCharonDto)
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para cadastrar caronte' })
  @ApiCreatedResponse({ type: CaronteEntity })
  @ApiConflictResponse({type: CaronteConflictResponseEntity })
  @ApiBadRequestResponse({ type: CaronteBadRequestResponseEntity })
  create(@Body() createCaronteDto: CreateCaronteDto) {
    return this.caronteService.create(createCaronteDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para buscar todos os carontes' })
  @ApiOkResponse({ type: CaronteEntity, isArray: true })
  @ApiNotFoundResponse({type: CaronteNotFoundResponseEntity })
  findAll() {
    return this.caronteService.findAll();
  }

  @Get('environment/:envId')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para buscar todos os carontes de um ambiente' })
  @ApiOkResponse({ type: CaronteEntity, isArray: true })
  @ApiNotFoundResponse({type: CaronteNotFoundResponseEntity })
  @ApiBadRequestResponse({ type: CaronteIdParamInvalidResponseEntity })
  findAllByEnvironment(@Param('envId') envId: string) {
    return this.caronteService.findAllByEnvironment(envId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para buscar um caronte' })
  @ApiOkResponse({ type: CaronteEntity })
  @ApiNotFoundResponse({type: CaronteNotFoundResponseEntity })
  @ApiBadRequestResponse({ type: CaronteIdParamInvalidResponseEntity })
  findOne(@Param('id') id: string) {
    return this.caronteService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para atualizar um caronte' })
  @ApiOkResponse({ type: CaronteEntity })
  @ApiNotFoundResponse({type: CaronteNotFoundResponseEntity })
  @ApiBadRequestResponse({ type: CaronteIdParamInvalidResponseEntity })
  update(@Param('id') id: string, @Body() updateCaronteDto: UpdateCaronteDto) {
    return this.caronteService.update(id, updateCaronteDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Endpoint para remover um caronte' })
  @ApiOkResponse({ type: CaronteEntity })
  @ApiNotFoundResponse({type: CaronteNotFoundResponseEntity })
  @ApiBadRequestResponse({ type: CaronteIdParamInvalidResponseEntity })
  remove(@Param('id') id: string) {
    return this.caronteService.remove(id);
  }
}
