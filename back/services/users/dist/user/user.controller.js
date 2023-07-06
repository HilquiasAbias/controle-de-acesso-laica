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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const microservices_1 = require("@nestjs/microservices");
const create_user_dto_1 = require("./dto/create-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        return await this.userService.create(createUserDto);
    }
    async findAllEnvironmentManager() {
        return await this.userService.findAllEnvironmentManager();
    }
    async findAllAdmins() {
        return await this.userService.findAllAdmins();
    }
    async findAllFrequenters() {
        return await this.userService.findAllFrequenters();
    }
    async findOne(id) {
        return await this.userService.findOne(id);
    }
    async findAllInactive() {
        return await this.userService.findAllInactive();
    }
    async updateGeneralData(payload) {
        const { id, updateUserGeneralDto } = payload;
        return await this.userService.updateGeneralData(id, updateUserGeneralDto);
    }
    async updateRolesData(payload) {
        const { id, updateUserRolesDto } = payload;
        return await this.userService.updateRolesData(id, updateUserRolesDto);
    }
    async changeUserStatus(payload) {
        const { id, userStatusDto } = payload;
        return await this.userService.changeUserStatus(id, userStatusDto);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "create-user" }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get-environment_managers" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllEnvironmentManager", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get-admins" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllAdmins", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get-frequenters" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllFrequenters", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get-one" }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get-inactives" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllInactive", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "update-general-data" }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateGeneralData", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "update-roles-data" }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateRolesData", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "change-user-status" }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserStatus", null);
UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map