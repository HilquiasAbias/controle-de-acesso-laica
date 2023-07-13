import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserGeneralDto } from './dto/update-user-general.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { UserStatusDto } from './dto/status-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    findOneForAuth(payload: {
        userId: string;
    }): Promise<{
        id: string;
        password: string;
    }>;
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
    updateGeneralData(payload: {
        id: string;
        updateUserGeneralDto: UpdateUserGeneralDto;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
    updateRolesData(payload: {
        id: string;
        updateUserRolesDto: UpdateUserRolesDto;
    }): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        role: string;
        active: boolean;
        userId: string;
    }, unknown, never> & {})[]>;
    changeUserStatus(payload: {
        id: string;
        userStatusDto: UserStatusDto;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
}
