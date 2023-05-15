import { Roles } from "@prisma/client";
export declare class CreateUserDto {
    name: string;
    registration: string;
    password: string;
    role: Roles;
    tag?: string;
    bluetooth?: string;
}
