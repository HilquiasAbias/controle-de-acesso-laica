import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Roles as UserRoles } from '@prisma/client';

@Roles(UserRoles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('environments')
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Post()
  create(@Body() createEnvironmentDto: CreateEnvironmentDto) {
    return this.environmentsService.create(createEnvironmentDto);
  }

  @Get()
  findAll() {
    return this.environmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.environmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnvironmentDto: UpdateEnvironmentDto) {
    return this.environmentsService.update(+id, updateEnvironmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.environmentsService.remove(+id);
  }
}
