import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRequest } from '../interfaces/req-user';
//import { Roles as UserRoles } from '@prisma/client';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ description: 'Endpoint para administradores cadastrarem usuários' })
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto, @Req() req: UserRequest) {
    const requestUser = req.user
    return this.usersService.create(createUserDto, requestUser);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admins')
  @ApiOperation({ description: 'Endpoint para buscar todos os admins' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAllAdmins() {
    return this.usersService.findAllAdmins();
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('frequenters')
  @ApiOperation({ description: 'Endpoint para buscar todos os frequentadores' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAllFrequenters() {
    return this.usersService.findAllFrequenters();
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('frequenters/env/:envId')
  @ApiOperation({ description: 'Endpoint para buscar todos os frequentadores de um ambiente' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAllFrequentersByEnvironment(@Param('envId') envId: string) {
    return this.usersService.findAllFrequentersByEnvironment(envId);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admins/env/:envId')
  @ApiOperation({ description: 'Endpoint para buscar todos os administradores de um ambiente' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAllAdminsByEnvironment(@Param('envId') envId: string) {
    return this.usersService.findAllAdminsByEnvironment(envId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ description: 'Endpoint para buscar um usuário' })
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string, @Req() req: UserRequest) {
    const userId = req.user.id
    return this.usersService.findOne(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:role/:id')
  @ApiOperation({ description: 'Endpoint para atualizar um usuário' })
  @ApiOkResponse({ type: UserEntity })
  update(@Param('id') id: string, @Param('role') role: string, @Body() updateUserDto: UpdateUserDto, @Req() req: UserRequest) {
    const requestUser = req.user
    return this.usersService.update(id, role, updateUserDto, requestUser);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ description: 'Endpoint para remover um usuário' })
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}