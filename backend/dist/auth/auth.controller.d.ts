import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ registration, password }: LoginDto): Promise<AuthEntity>;
}
