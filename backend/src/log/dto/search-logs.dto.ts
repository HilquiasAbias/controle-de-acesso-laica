import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsNumberString, IsIn } from "class-validator";

export class SearchLogslDto {
  @ApiProperty({
    default: 0,
    description: 'Página anterior'
  })
  @IsNumberString()
  previous?: number;

  @ApiProperty({
    default: 1,
    description: 'Página atual'
  })
  @IsNumberString()
  next?: number;

  @ApiProperty({
    default: 10,
    description: 'Quantidade de logs por página'
  })
  @IsNumberString()
  pageSize?: number;

  @ApiProperty({
    description: 'MAC do dispositivo que gerou o log. Exemplo: 36:AE:AE:B5:A3:B2'
  })
  @IsString()
  @IsOptional()
  deviceMac?: string;

  @ApiProperty({
    default: 'INFO',
    enum: ['INFO', 'WARN', 'ERROR'],
    description: 'Nível de log. INFO, WARN ou ERROR'
  })
  @IsIn(['INFO', 'WARN', 'ERROR'])
  type?: string;

  @ApiProperty({
    default: 'desc',
    enum: ['asc', 'desc'],
    description: 'Ordenação dos logs. asc ou desc'
  })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  order?: 'asc' | 'desc'

  @ApiProperty({
    description: 'Tópico do log. Exemplo: Ambiente, Segurança, etc.'
  })
  @IsString()
  @IsOptional()
  topic?: string;
}