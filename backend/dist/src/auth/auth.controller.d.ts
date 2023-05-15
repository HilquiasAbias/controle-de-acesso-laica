import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ registration, password }: LoginDto): Promise<import("./entities/auth.entity").AuthEntity>;
}
