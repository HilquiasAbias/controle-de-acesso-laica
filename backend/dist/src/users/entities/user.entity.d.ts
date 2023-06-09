import { User } from "@prisma/client";
export declare class UserEntity implements User {
    id: string;
    name: string;
    password: string;
    registration: string;
    mac: string | null;
    role: string;
    environmentAdminId: string | null;
    environmentFrequenterId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
