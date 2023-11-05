import { ApiProperty } from "@nestjs/swagger";

export class SearchLogslDto {
  @ApiProperty({
    default: 0
  })
  previous?: number;
  
  @ApiProperty({
    default: 1
  })
  next?: number;
  
  @ApiProperty({
    default: 10
  })
  pageSize?: number;
  
  @ApiProperty({
    default: 0
  })
  deviceMac?: string;

  @ApiProperty({
    default: 'INFO',
    enum: ['INFO', 'WARN', 'ERROR'],
  })
  type?: string;

  @ApiProperty({
    default: 'desc',
    enum: ['asc', 'desc'],
  })
  order?: string;
}