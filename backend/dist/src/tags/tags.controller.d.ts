import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): Promise<import(".prisma/client").Tag>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Tag[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TagClient<import(".prisma/client").Tag, never>;
    update(id: string, updateTagDto: UpdateTagDto): import(".prisma/client").Prisma.Prisma__TagClient<import(".prisma/client").Tag, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TagClient<import(".prisma/client").Tag, never>;
}
