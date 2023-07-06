"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const class_validator_1 = require("class-validator");
let UsersService = class UsersService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        const pattern = { cmd: 'create-user' };
        const payload = createUserDto;
        return this.usersService.send(pattern, payload);
    }
    findAllFrequenters() {
        const pattern = { cmd: 'get-frequenters' };
        const payload = {};
        return this.usersService.send(pattern, payload);
    }
    findAllAdmins() {
        const pattern = { cmd: 'get-admins' };
        const payload = {};
        return this.usersService.send(pattern, payload);
    }
    findAllEnvironmentManager() {
        const pattern = { cmd: 'get-environment_managers' };
        const payload = {};
        return this.usersService.send(pattern, payload);
    }
    findAllInactive() {
        const pattern = { cmd: 'get-inactives' };
        return this.usersService.send(pattern, {});
    }
    findOne(id) {
        const pattern = { cmd: 'get-one' };
        const payload = id;
        return this.usersService.send(pattern, payload);
    }
    updateGeneralData(id, updateUserGeneralDto) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid id input');
        }
        console.log(updateUserGeneralDto);
        const validFields = ['email', 'name', 'registration', 'password'];
        const invalidFields = Object.keys(updateUserGeneralDto).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`);
        }
        const pattern = { cmd: "update-general-data" };
        const payload = { id, updateUserGeneralDto };
        return this.usersService.send(pattern, payload);
    }
    updateRoles(id, updateUserRolesDto) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid id input');
        }
        const validFields = ['rolesToAdd', 'rolesToRemove'];
        const invalidFields = Object.keys(updateUserRolesDto).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`);
        }
        const pattern = { cmd: "update-roles-data" };
        const payload = { id, updateUserRolesDto };
        return this.usersService.send(pattern, payload);
    }
    changeUserStatus(id, userStatusDto) {
        const pattern = { cmd: 'change-user-status' };
        const payload = {
            id,
            userStatusDto
        };
        return this.usersService.send(pattern, payload);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USERS')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map