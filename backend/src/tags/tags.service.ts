import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    let tag: Tag
    

    tag = await this.prisma.tag.create({
      data: { 
        content: createTagDto.content, 
        User: {connect: { id: createTagDto.userId }} 
      },
    })


    // if (!tag) {
    //   throw new HttpException("Can't create tag.", HttpStatus.FORBIDDEN);
    // }

    return tag;
  }

  findAll() {
    return this.prisma.tag.findMany();
  }

  findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Invalid Input. ID must be sent.');
    }

    return this.prisma.tag.findUniqueOrThrow({
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
