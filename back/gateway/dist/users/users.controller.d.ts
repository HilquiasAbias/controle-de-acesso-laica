import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserGeneralDto } from './dto/update-user-general.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): import("rxjs").Observable<any>;
    findAllFrequenters(): import("rxjs").Observable<any>;
    findAllAdmins(): import("rxjs").Observable<any>;
    findAllEnvironmentManager(): import("rxjs").Observable<any>;
    findOne(id: string): import("rxjs").Observable<any>;
    updateGeneralData(id: string, updateGeneralData: UpdateUserGeneralDto): import("rxjs").Observable<any>;
    updateRoles(id: string, updateRolesDto: UpdateUserRolesDto): import("rxjs").Observable<any>;
}
