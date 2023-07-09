import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class AuthService {
    private readonly securityService;
    constructor(securityService: ClientProxy);
    login(loginDto: LoginDto): import("rxjs").Observable<any>;
}
