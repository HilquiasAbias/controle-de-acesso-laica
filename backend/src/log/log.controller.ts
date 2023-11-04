import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('log')
@ApiTags('Log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @Get(':amount')
  findAll(@Param('amount') amount: string) {
    const amountInt = parseInt(amount);
    return this.logService.findAll(amountInt);
  }

  @Get('topic/:topic/:amount')
  findAllByTopic(@Param('topic') topic: string, @Param('amount') amount: string) {
    const amountInt = parseInt(amount);
    return this.logService.findAllByTopic(topic, amountInt);
  }

  @Get('device/:id')
  findOne(@Param('id') id: string) {
    return this.logService.findAllByCaronte(id);
  }

  @Delete('topic')
  clear(
    @Query('topic') topic: string,
  ) {
    return this.logService.clear(topic);
  }
}
