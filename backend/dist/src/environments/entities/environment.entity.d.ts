import { Environment } from "@prisma/client";
export declare class EnvironmentEntity implements Environment {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UserAddedEntity {
    successful: true;
}
