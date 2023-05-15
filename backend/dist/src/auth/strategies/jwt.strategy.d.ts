import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(payload: {
        userId: number;
    }): Promise<import(".prisma/client").User & {
        tag: import(".prisma/client").Tag;
        bluetooth: import(".prisma/client").Bluetooth;
        adminEnvironment: import(".prisma/client").Environment;
        frequenterEnvironment: import(".prisma/client").Environment;
    }>;
}
export {};
