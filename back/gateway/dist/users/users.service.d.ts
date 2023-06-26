import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersService {
    private readonly usersService;
    constructor(usersService: ClientProxy);
    create(createUserDto: CreateUserDto): import("rxjs").Observable<any>;
}
