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
exports.EnvironmentsController = void 0;
const common_1 = require("@nestjs/common");
const environments_service_1 = require("./environments.service");
const create_environment_dto_1 = require("./dto/create-environment.dto");
const update_environment_dto_1 = require("./dto/update-environment.dto");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const add_user_environment_dto_1 = require("./dto/add-user-environment.dto");
const swagger_1 = require("@nestjs/swagger");
const environment_entity_1 = require("./entities/environment.entity");
const environment_user_added_entity_1 = require("./entities/environment-user-added.entity");
const environment_bad_request_response_entity_1 = require("./entities/environment-bad-request-response.entity");
const environment_not_found_response_entity_1 = require("./entities/environment-not-found-response.entity");
let EnvironmentsController = exports.EnvironmentsController = class EnvironmentsController {
    constructor(environmentsService) {
        this.environmentsService = environmentsService;
    }
    getExample(request) {
        const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
        return { ip_client: ip };
    }
    create(createEnvironmentDto) {
        return this.environmentsService.create(createEnvironmentDto);
    }
    addUserInEnvironment(addUserInEnvironmentDto) {
        return this.environmentsService.addUserInEnvironment(addUserInEnvironmentDto);
    }
    findAll() {
        return this.environmentsService.findAll();
    }
    findOne(id) {
        return this.environmentsService.findOne(id);
    }
    update(id, updateEnvironmentDto) {
        return this.environmentsService.update(id, updateEnvironmentDto);
    }
    remove(id) {
        return this.environmentsService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)('ip'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "getExample", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para cadastrarar ambientes' }),
    (0, swagger_1.ApiCreatedResponse)({ type: environment_entity_1.EnvironmentEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_environment_dto_1.CreateEnvironmentDto]),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('add/user'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para adcionar um usuário em um ambiente' }),
    (0, swagger_1.ApiOkResponse)({ type: environment_user_added_entity_1.UserAddedEntity }),
    (0, swagger_1.ApiBadRequestResponse)({ type: environment_bad_request_response_entity_1.EnvironmentBadRequestResponseEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_user_environment_dto_1.AddUserInEnvironmentDto]),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "addUserInEnvironment", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para buscar todos os ambientes' }),
    (0, swagger_1.ApiOkResponse)({ type: environment_entity_1.EnvironmentEntity, isArray: true }),
    (0, swagger_1.ApiNotFoundResponse)({ type: environment_not_found_response_entity_1.EnvironmentNotFoundResponseEntity }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para buscar um ambiente' }),
    (0, swagger_1.ApiOkResponse)({ type: environment_entity_1.EnvironmentEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ type: environment_not_found_response_entity_1.EnvironmentNotFoundResponseEntity }),
    (0, swagger_1.ApiBadRequestResponse)({ type: environment_bad_request_response_entity_1.EnvironmentBadRequestResponseEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para atualizar um ambiente' }),
    (0, swagger_1.ApiOkResponse)({ type: environment_entity_1.EnvironmentEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_environment_dto_1.UpdateEnvironmentDto]),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para remover um ambiente' }),
    (0, swagger_1.ApiOkResponse)({ type: environment_entity_1.EnvironmentEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "remove", null);
exports.EnvironmentsController = EnvironmentsController = __decorate([
    (0, common_1.Controller)('environments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Environments'),
    __metadata("design:paramtypes", [environments_service_1.EnvironmentsService])
], EnvironmentsController);
//# sourceMappingURL=environments.controller.js.map