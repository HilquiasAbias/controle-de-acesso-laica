import { IAccessTime } from "src/interfaces/access-time";
export declare class AddUserInEnvironmentDto {
    envId: string;
    userId: string;
    role: string;
    accessTime?: IAccessTime[];
}
