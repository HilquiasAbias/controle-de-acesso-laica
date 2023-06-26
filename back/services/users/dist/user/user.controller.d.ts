import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        registration: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown, never> & {}>;
}
