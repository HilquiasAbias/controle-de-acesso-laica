import { Log } from "@prisma/client";
export declare class LogEntity implements Log {
    id: string;
    caronteMac: string;
    userRegistration: string;
    type: string;
    message: string;
    obolType: string;
    createdAt: Date;
}
