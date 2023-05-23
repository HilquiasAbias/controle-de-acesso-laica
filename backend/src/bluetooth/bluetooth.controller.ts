import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BluetoothService } from './bluetooth.service';
import { CreateBluetoothDto } from './dto/create-bluetooth.dto';
import { UpdateBluetoothDto } from './dto/update-bluetooth.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRequest } from 'src/users/interfaces/req-user';
import { User } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ReadEnvMacsDto } from './dto/read-env-macs.dto';

@Controller('mac')
export class BluetoothController {
  constructor(private readonly bluetoothService: BluetoothService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBluetoothDto: CreateBluetoothDto, @Req() req: UserRequest) {
    const requestUser: User = req.user
    return this.bluetoothService.create(createBluetoothDto, requestUser);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.bluetoothService.findAll();
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('environment')
  findAllByEnv(@Body() body: ReadEnvMacsDto) {
    return this.bluetoothService.findAllMacsByEnvironment(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bluetoothService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateBluetoothDto: UpdateBluetoothDto, 
    @Req() req: UserRequest
    ) {
      const userId = req.user.id
    return this.bluetoothService.update(+id, updateBluetoothDto, userId);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bluetoothService.remove(+id);
  }
}
