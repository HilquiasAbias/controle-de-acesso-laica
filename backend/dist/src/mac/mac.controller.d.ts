import { MacService } from './mac.service';
import { CreateMacDto } from './dto/create-mac.dto';
import { UpdateMacDto } from './dto/update-mac.dto';
import { UserRequest } from 'src/users/interfaces/req-user';
import { ReadEnvMacsDto } from './dto/read-env-macs.dto';
export declare class MacController {
    private readonly macService;
    constructor(macService: MacService);
    create(createMacDto: CreateMacDto, req: UserRequest): Promise<import(".prisma/client").Mac>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Mac[]>;
    findAllByEnv(body: ReadEnvMacsDto): Promise<import(".prisma/client").Mac[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MacClient<import(".prisma/client").Mac, never>;
    update(id: string, updateMacDto: UpdateMacDto, req: UserRequest): import(".prisma/client").Prisma.Prisma__MacClient<import(".prisma/client").Mac, never>;
    remove(id: string, req: UserRequest): import(".prisma/client").Prisma.Prisma__MacClient<import(".prisma/client").Mac, never>;
}
