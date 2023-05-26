import { Request } from 'express';
import { AppService } from "./app.service";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    teste(ip: any, params: string[]): Promise<{
        msg: string;
    }>;
    getIpAddress(request: Request): {
        ip_client: string;
    };
}
