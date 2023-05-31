import { Request } from 'express';
import { AppService } from "./app.service";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getExample(request: Request): {
        ip_client: string | string[];
    };
}
