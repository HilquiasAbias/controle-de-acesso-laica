import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserGeneralDto } from './dto/update-user-general.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';

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

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch('/:id')
  updateGeneralData(@Param('id') id: string, @Body() updateGeneralData: UpdateUserGeneralDto) {
    return this.usersService.updateGeneralData(id, updateGeneralData);
  }

  @Patch('roles/:id')
  updateRoles(@Param('id') id: string, updateRolesDto: UpdateUserRolesDto) {
    return this.usersService.updateRoles(id, updateRolesDto);
  }
}