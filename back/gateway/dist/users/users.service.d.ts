import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserGeneralDto } from "./dto/update-user-general.dto";
import { UpdateUserRolesDto } from "./dto/update-user-roles.dto";
export declare class UsersService {
    private readonly usersService;
    constructor(usersService: ClientProxy);
    create(createUserDto: CreateUserDto): import("rxjs").Observable<any>;
    findAllFrequenters(): import("rxjs").Observable<any>;
    findAllAdmins(): import("rxjs").Observable<any>;
    findAllEnvironmentManager(): import("rxjs").Observable<any>;
    findOne(id: string): import("rxjs").Observable<any>;
    updateGeneralData(id: string, updateUserGeneralDto: UpdateUserGeneralDto): import("rxjs").Observable<any>;
    updateRoles(id: string, updateUserRolesDto: UpdateUserRolesDto): import("rxjs").Observable<any>;
}
