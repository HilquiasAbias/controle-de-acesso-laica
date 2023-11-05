import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { SearchLogslDto } from './dto/search-logs.dto';

@Controller('log')
@ApiTags('Endpoints')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @ApiProperty()
  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @Get()
  read(@Query() query: SearchLogslDto) {
    query.previous = Number(query.previous);
    query.next = Number(query.next);
    query.pageSize = Number(query.pageSize);

    return this.logService.read(query);
  }
}
