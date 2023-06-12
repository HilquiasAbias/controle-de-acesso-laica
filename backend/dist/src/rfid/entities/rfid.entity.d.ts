import { Rfid } from "@prisma/client";
export declare class RfidEntity implements Rfid {
    id: string;
    tag: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
