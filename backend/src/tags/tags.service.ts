import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    let tag: Tag
    
    if (createTagDto.userId) {
      tag = await this.prisma.tag.create({
        data: { 
          content: createTagDto.content, 
          User: {connect: { id: createTagDto.userId }} 
        },
      })
    } else {
      tag = await this.prisma.tag.create({
        data: { 
          content: createTagDto.content
        },
      })
    }

    // if (!tag) {
    //   throw new HttpException("Can't create tag.", HttpStatus.FORBIDDEN);
    // }

    return tag;
  }

  findAll() {
    return this.prisma.tag.findMany();
  }

  findOne(id: number) {
    return this.prisma.tag.findFirst({
      where: { id }
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.prisma.tag.update({
      where: { id },
      data: updateTagDto
    });
  }

  remove(id: number) {
    return this.prisma.tag.delete({
      where: { id }
    });
  }
}
