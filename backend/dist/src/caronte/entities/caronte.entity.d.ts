import { Caronte } from "@prisma/client";
export declare class CaronteEntity implements Caronte {
    id: string;
    ip: string;
    esp: string;
    password: string;
    environmentId: string;
}
export declare class CaronteResponseEntity {
    access: 'valid';
}
