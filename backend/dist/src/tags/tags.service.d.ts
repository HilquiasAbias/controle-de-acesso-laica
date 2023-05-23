import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tag, User } from '@prisma/client';
import { ReadEnvTagsDto } from './dto/read-env-tags.dto';
export declare class TagsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTagDto: CreateTagDto): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findAllTagsByEnvironment(body: ReadEnvTagsDto): Promise<Tag[]>;
    findOne(id: number): Promise<Tag>;
    update(id: number, updateTagDto: UpdateTagDto, requestUser: User): Promise<Tag>;
    remove(id: number): Promise<Tag>;
}
