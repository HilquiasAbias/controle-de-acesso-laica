import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { UserRequest } from 'src/users/interfaces/req-user';
import { ReadEnvTagsDto } from './dto/read-env-tags.dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): Promise<import(".prisma/client").Tag>;
    findAll(): Promise<import(".prisma/client").Tag[]>;
    findAllByEnv(body: ReadEnvTagsDto): Promise<import(".prisma/client").Tag[]>;
    findOne(id: string): Promise<import(".prisma/client").Tag>;
    update(id: string, updateTagDto: UpdateTagDto, req: UserRequest): Promise<import(".prisma/client").Tag>;
    remove(id: string): Promise<import(".prisma/client").Tag>;
}
