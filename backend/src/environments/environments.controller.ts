import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AddUserInEnvironmentDto } from './dto/add-user-environment.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
//import { Roles as UserRoles } from '@prisma/client';
import { Request } from 'express';
import * as requestIp from 'request-ip';
import { EnvironmentEntity } from './entities/environment.entity';
import { UserAddedEntity } from './entities/environment-user-added.entity';
import { EnvironmentBadRequestResponseEntity } from './entities/environment-bad-request-response.entity';
import { EnvironmentNotFoundResponseEntity } from './entities/environment-not-found-response.entity';

@Controller('environments')
@ApiBearerAuth()
@ApiTags('Environments')
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Get('ip')
  getExample(@Req() request: Request) {
    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    return { ip_client: ip };
  }

  // @Get('ip')
  // getExample(@Req() request: Request) {
  //   const ip = requestIp.getClientIp(request);
  //   return { ip_client: ip };
  // }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ description: 'Endpoint para cadastrarar ambientes' })
  @ApiCreatedResponse({ type: EnvironmentEntity })
  create(@Body() createEnvironmentDto: CreateEnvironmentDto) {
    return this.environmentsService.create(createEnvironmentDto);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add/user')
  @ApiOperation({ description: 'Endpoint para adcionar um usuário em um ambiente' })
  @ApiOkResponse({ type: UserAddedEntity })
  @ApiBadRequestResponse({ type: EnvironmentBadRequestResponseEntity })
  addUserInEnvironment(@Body() addUserInEnvironmentDto: AddUserInEnvironmentDto) {
    return this.environmentsService.addUserInEnvironment(addUserInEnvironmentDto);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ description: 'Endpoint para buscar todos os ambientes' })
  @ApiOkResponse({ type: EnvironmentEntity, isArray: true })
  @ApiNotFoundResponse({ type: EnvironmentNotFoundResponseEntity })
  findAll() {
    return this.environmentsService.findAll();
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ description: 'Endpoint para buscar um ambiente' })
  @ApiOkResponse({ type: EnvironmentEntity })
  @ApiNotFoundResponse({ type: EnvironmentNotFoundResponseEntity })
  @ApiBadRequestResponse({ type: EnvironmentBadRequestResponseEntity })
  findOne(@Param('id') id: string) {
    return this.environmentsService.findOne(id);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ description: 'Endpoint para atualizar um ambiente' })
  @ApiOkResponse({ type: EnvironmentEntity })
  update(@Param('id') id: string, @Body() updateEnvironmentDto: UpdateEnvironmentDto) {
    return this.environmentsService.update(id, updateEnvironmentDto);
  }

  @Roles('ADMIN') // UserRoles.ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ description: 'Endpoint para remover um ambiente' })
  @ApiOkResponse({ type: EnvironmentEntity })
  remove(@Param('id') id: string) {
    return this.environmentsService.remove(id);
  }
}

