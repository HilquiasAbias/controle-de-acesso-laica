import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tag } from '@prisma/client';
export declare class TagsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTagDto: CreateTagDto): Promise<Tag>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<Tag[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__TagClient<Tag, never>;
    update(id: number, updateTagDto: UpdateTagDto): import(".prisma/client").Prisma.Prisma__TagClient<Tag, never>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__TagClient<Tag, never>;
}
