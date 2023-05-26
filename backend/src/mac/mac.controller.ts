import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MacService } from './mac.service';
import { CreateMacDto } from './dto/create-mac.dto';
import { UpdateMacDto } from './dto/update-mac.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRequest } from 'src/users/interfaces/req-user';
import { User } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ReadEnvMacsDto } from './dto/read-env-macs.dto';

@Controller('mac')
export class MacController {
  constructor(private readonly macService: MacService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMacDto: CreateMacDto, @Req() req: UserRequest) {
    const requestUser: User = req.user
    return this.macService.create(createMacDto, requestUser);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.macService.findAll();
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('environment')
  findAllByEnv(@Body() body: ReadEnvMacsDto) {
    return this.macService.findAllMacsByEnvironment(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.macService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateMacDto: UpdateMacDto, 
    @Req() req: UserRequest
    ) {
    const userId = req.user.id
    return this.macService.update(+id, updateMacDto, userId);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: UserRequest) {
    const userId = req.user.id
    return this.macService.remove(+id, userId);
  }
}
