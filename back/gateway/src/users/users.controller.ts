import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserGeneralDto } from './dto/update-user-general.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { UserStatusDto } from './dto/status-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('/frequenters')
  findAllFrequenters() {
    return this.usersService.findAllFrequenters()
  }

  @Get('/admins')
  findAllAdmins() {
    return this.usersService.findAllAdmins()
  }

  @Get('/environment_managers')
  findAllEnvironmentManager() {
    return this.usersService.findAllEnvironmentManager()
  }

  @Get('/inactives')
  findAllInactive() {
    return this.usersService.findAllInactive()
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch('data/:id')
  updateGeneralData(@Param('id') id: string, @Body() updateGeneralDataDto: UpdateUserGeneralDto) {
    return this.usersService.updateGeneralData(id, updateGeneralDataDto);
  }

  @Patch('roles/:id')
  updateRoles(@Param('id') id: string, @Body() updateRolesDto: UpdateUserRolesDto) {
    return this.usersService.updateRoles(id, updateRolesDto);
  }

  @Patch('status/:id')
  changeUserStatus(@Param('id') id: string, @Body() userStatusDto: UserStatusDto) {
    return this.usersService.changeUserStatus(id, userStatusDto);
  }
}