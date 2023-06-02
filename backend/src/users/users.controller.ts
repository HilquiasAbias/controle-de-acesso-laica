import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRequest } from './interfaces/req-user';
//import { Roles as UserRoles } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: UserRequest) {
    const requestUser = req.user
    return this.usersService.create(createUserDto, requestUser);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admins')
  findAllAdmins() {
    return this.usersService.findAllAdmins();
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('frequenters')
  findAllFrequenters() {
    return this.usersService.findAllFrequenters();
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('frequenters/env/:envId')
  findAllFrequentersByEnvironment(@Param('envId') envId: number) {
    return this.usersService.findAllFrequentersByEnvironment(envId);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admins/env/:envId')
  findAllAdminsByEnvironment(@Param('envId') envId: number) {
    return this.usersService.findAllAdminsByEnvironment(envId);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:role/:id')
  update(@Param('id') id: string, @Param('role') role: string, @Body() updateUserDto: UpdateUserDto, @Req() req: UserRequest) {
    const requestUser = req.user
    return this.usersService.update(+id, role, updateUserDto, requestUser);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}