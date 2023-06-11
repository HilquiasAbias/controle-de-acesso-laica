import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RfidService } from './rfid.service';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { UpdateRfidDto } from './dto/update-rfid.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRequest } from '../interfaces/req-user';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RfidEntity } from './entities/rfid.entity';

@Controller('rfid')
@ApiBearerAuth()
@ApiTags('RFID')
export class RfidController {
  constructor(private readonly rfidService: RfidService) {}

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ description: 'Endpoint para cadastrar tag rfid' })
  @ApiCreatedResponse({ type: RfidEntity })
  create(@Body() createRfidDto: CreateRfidDto) {
    return this.rfidService.create(createRfidDto);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ description: 'Endpoint para buscar todas as tags rfid' })
  @ApiOkResponse({ type: RfidEntity, isArray: true })
  findAll() {
    return this.rfidService.findAll();
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('environment/:envId')
  @ApiOperation({ description: 'Endpoint para buscar todas as tags rfid de um ambiente' })
  @ApiOkResponse({ type: RfidEntity, isArray: true })
  findAllByEnv(@Param('envId') envId: string) {
    return this.rfidService.findAllTagsByEnvironment(envId);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ description: 'Endpoint para buscar uma tag rfid' })
  @ApiOkResponse({ type: RfidEntity })
  findOne(@Param('id') id: string) {
    return this.rfidService.findOne(id);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ description: 'Endpoint para atualizar uma tag rfid' })
  @ApiOkResponse({ type: RfidEntity })
  update(@Param('id') id: string, @Body() updateRfidDto: UpdateRfidDto, @Req() req: UserRequest) {
    const requestUser = req.user
    return this.rfidService.update(id, updateRfidDto, requestUser);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ description: 'Endpoint para remover uma tag rfid' })
  @ApiOkResponse({ type: RfidEntity })
  remove(@Param('id') id: string) {
    return this.rfidService.remove(id);
  }
}