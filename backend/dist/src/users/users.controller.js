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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./entities/user.entity");
let UsersController = exports.UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto, req) {
        const requestUser = req.user;
        return this.usersService.create(createUserDto, requestUser);
    }
    findAllAdmins() {
        return this.usersService.findAllAdmins();
    }
    findAllFrequenters() {
        return this.usersService.findAllFrequenters();
    }
    findAllFrequentersByEnvironment(envId) {
        return this.usersService.findAllFrequentersByEnvironment(envId);
    }
    findAllAdminsByEnvironment(envId) {
        return this.usersService.findAllAdminsByEnvironment(envId);
    }
    findOne(id, req) {
        const userId = req.user.id;
        return this.usersService.findOne(id, userId);
    }
    update(id, role, updateUserDto, req) {
        const requestUser = req.user;
        return this.usersService.update(id, role, updateUserDto, requestUser);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para administradores cadastrarem usuários' }),
    (0, swagger_1.ApiCreatedResponse)({ type: user_entity_1.UserEntity }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('admins'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para buscar todos os admins' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllAdmins", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('frequenters'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para buscar todos os frequentadores' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllFrequenters", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('frequenters/env/:envId'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para buscar todos os frequentadores de um ambiente' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity, isArray: true }),
    __param(0, (0, common_1.Param)('envId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllFrequentersByEnvironment", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('admins/env/:envId'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para buscar todos os administradores de um ambiente' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity, isArray: true }),
    __param(0, (0, common_1.Param)('envId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllAdminsByEnvironment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para buscar um usuário' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/:role/:id'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para atualizar um usuário' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('role')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para remover um usuário' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map