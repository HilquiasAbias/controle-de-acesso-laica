import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserGeneralDto } from './dto/update-user-general.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { UserStatusDto } from './dto/status-user.dto';
export declare const roundsOfHashing = 10;
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    findAllFrequenters(): Promise<({
        Rfid: import("@prisma/client/runtime").GetResult<{
            id: string;
            tag: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
        Device: import("@prisma/client/runtime").GetResult<{
            id: string;
            mac: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
        Roles: (import("@prisma/client/runtime").GetResult<{
            id: string;
            role: string;
            active: boolean;
            userId: string;
        }, unknown, never> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        active: boolean;
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
        Device: import("@prisma/client/runtime").GetResult<{
            id: string;
            mac: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
        Roles: (import("@prisma/client/runtime").GetResult<{
            id: string;
            role: string;
            active: boolean;
            userId: string;
        }, unknown, never> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    findAllEnvironmentManager(): Promise<({
        Rfid: import("@prisma/client/runtime").GetResult<{
            id: string;
            tag: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
        Device: import("@prisma/client/runtime").GetResult<{
            id: string;
            mac: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
        Roles: (import("@prisma/client/runtime").GetResult<{
            id: string;
            role: string;
            active: boolean;
            userId: string;
        }, unknown, never> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {})[]>;
    findAllInactive(): Promise<({
        Rfid: import("@prisma/client/runtime").GetResult<{
            id: string;
            tag: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
        Device: import("@prisma/client/runtime").GetResult<{
            id: string;
            mac: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
        Roles: (import("@prisma/client/runtime").GetResult<{
            id: string;
            role: string;
            active: boolean;
            userId: string;
        }, unknown, never> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        active: boolean;
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
        Device: import("@prisma/client/runtime").GetResult<{
            id: string;
            mac: string;
            active: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown, never> & {};
        Roles: (import("@prisma/client/runtime").GetResult<{
            id: string;
            role: string;
            active: boolean;
            userId: string;
        }, unknown, never> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    updateGeneralData(id: string, updateUserGeneralDto: UpdateUserGeneralDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    updateRolesData(userId: string, updateUserRolesDto: UpdateUserRolesDto): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        role: string;
        active: boolean;
        userId: string;
    }, unknown, never> & {})[]>;
    changeUserStatus(userId: string, userStatusDto: UserStatusDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    private updateUserRelationsStatus;
}
