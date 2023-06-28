import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}