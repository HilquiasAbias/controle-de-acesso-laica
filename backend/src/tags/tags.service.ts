import { Injectable, HttpException, HttpStatus, BadRequestException, Body } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tag, User } from '@prisma/client';
import { ReadEnvTagsDto } from './dto/read-env-tags.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: createTagDto.userId },
      include: { tag: true }
    })

    if (user.tag) {
      throw new HttpException('User already has a tag', HttpStatus.FORBIDDEN);
    }

    let tag: Tag
  
    try {
      tag = await this.prisma.tag.create({
        data: { 
          content: createTagDto.content, 
          User: {connect: { id: createTagDto.userId }} 
        },
      })
      
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException("tag alredy exists.", HttpStatus.CONFLICT);
      } else {
        throw new HttpException("Can't create tag.", HttpStatus.FORBIDDEN);
      }
    }

    return tag;
  }

  async findAll() {
    try {
      return await this.prisma.tag.findMany();
    } catch (error) {
      throw new Error()
    }
  }

  async findAllTagsByEnvironment(body: ReadEnvTagsDto) {
    const env = await this.prisma.environment.findFirst({
      where: { id: body.envId },
      include: { 
        admins: { include: { tag: true } },
        frequenters: { include: { tag: true } }
      }
    });

    if (!env) {
      throw new HttpException("Environment not found", HttpStatus.NOT_FOUND);
    }

    const tags: Tag[] = []

    env.admins.forEach(admin => {
      if (admin.tag) tags.push(admin.tag)
    })

    env.frequenters.forEach(frequenter => {
      if (frequenter.tag) tags.push(frequenter.tag)
    })

    try {
      return tags
    } catch (error) {
      throw new Error()
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Invalid Input. ID must be sent.');
    }

    return await this.prisma.tag.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto, requestUser: User) {
    const validFields = ['content', 'userId'];
    const invalidFields = Object.keys(updateTagDto).filter(
      field => !validFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields provided: ${invalidFields.join(', ')}`,
      );
    }

    const tag = await this.prisma.tag.findFirst({
      where: { id },
      include: { User: true }
    })

    if (requestUser.id !== tag.User.id && tag.User.role === 'ADMIN') {
      throw new HttpException("An admin cannot update another admin's tag", HttpStatus.UNAUTHORIZED);
    }

    try {
      return await this.prisma.tag.update({
        where: { id },
        data: updateTagDto
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException("Tag not found", HttpStatus.NOT_FOUND);
      } else if (error.code === 'P2002') {
        throw new HttpException("This tag already exists", HttpStatus.CONFLICT);
      } else {
        throw new HttpException("Can't update tag.", HttpStatus.FORBIDDEN);
      }
    }
  }

  async remove(id: number) {
    if (isNaN(id)) {
      throw new HttpException("Id must be a number", HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.tag.delete({
      where: { id }
    });
  }
}
