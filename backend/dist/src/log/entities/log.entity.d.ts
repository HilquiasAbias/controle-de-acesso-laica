import { Log } from "@prisma/client";
export declare class LogEntity implements Log {
    id: string;
    caronteMac: string;
    type: string;
    message: string;
    topic: string;
    createdAt: Date;
}
