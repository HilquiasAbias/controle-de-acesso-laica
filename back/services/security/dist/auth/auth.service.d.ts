import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import { ClientProxy } from '@nestjs/microservices';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: ClientProxy, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<AuthEntity>;
    validateToken(token: string): Promise<void>;
}
