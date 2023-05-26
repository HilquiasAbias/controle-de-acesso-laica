import { PrismaService } from "./prisma/prisma.service";
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    teste(ip: any, params: any): Promise<{
        msg: string;
    }>;
}
