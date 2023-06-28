import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): import("rxjs").Observable<any>;
    findAllFrequenters(): import("rxjs").Observable<any>;
    findAllAdmins(): import("rxjs").Observable<any>;
    findAllEnvironmentManager(): import("rxjs").Observable<any>;
}
