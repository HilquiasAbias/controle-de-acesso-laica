import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    findAllEnvironmentManager(): Promise<({
        Rfid: import("@prisma/client/runtime").GetResult<{
            id: string;
            tag: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    findAllAdmins(): Promise<({
        Rfid: import("@prisma/client/runtime").GetResult<{
            id: string;
            tag: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    findAllFrequenters(): Promise<({
        Rfid: import("@prisma/client/runtime").GetResult<{
            id: string;
            tag: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    findOne(id: string): Promise<{
        Rfid: import("@prisma/client/runtime").GetResult<{
            id: string;
            tag: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
}
