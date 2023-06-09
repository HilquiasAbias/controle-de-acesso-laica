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
exports.RfidController = void 0;
const common_1 = require("@nestjs/common");
const rfid_service_1 = require("./rfid.service");
const create_rfid_dto_1 = require("./dto/create-rfid.dto");
const update_rfid_dto_1 = require("./dto/update-rfid.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const rfid_entity_1 = require("./entities/rfid.entity");
let RfidController = exports.RfidController = class RfidController {
    constructor(rfidService) {
        this.rfidService = rfidService;
    }
    create(createRfidDto) {
        return this.rfidService.create(createRfidDto);
    }
    findAll() {
        return this.rfidService.findAll();
    }
    findAllByEnv(envId) {
        return this.rfidService.findAllTagsByEnvironment(envId);
    }
    findOne(id) {
        return this.rfidService.findOne(id);
    }
    update(id, updateRfidDto, req) {
        const requestUser = req.user;
        return this.rfidService.update(id, updateRfidDto, requestUser);
    }
    remove(id) {
        return this.rfidService.remove(id);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para cadastrar tag rfid' }),
    (0, swagger_1.ApiCreatedResponse)({ type: rfid_entity_1.RfidEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rfid_dto_1.CreateRfidDto]),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para buscar todas as tags rfid' }),
    (0, swagger_1.ApiOkResponse)({ type: rfid_entity_1.RfidEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('environment/:envId'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para buscar todas as tags rfid de um ambiente' }),
    (0, swagger_1.ApiOkResponse)({ type: rfid_entity_1.RfidEntity, isArray: true }),
    __param(0, (0, common_1.Param)('envId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "findAllByEnv", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para buscar uma tag rfid' }),
    (0, swagger_1.ApiOkResponse)({ type: rfid_entity_1.RfidEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para atualizar uma tag rfid' }),
    (0, swagger_1.ApiOkResponse)({ type: rfid_entity_1.RfidEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rfid_dto_1.UpdateRfidDto, Object]),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ description: 'Endpoint para remover uma tag rfid' }),
    (0, swagger_1.ApiOkResponse)({ type: rfid_entity_1.RfidEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "remove", null);
exports.RfidController = RfidController = __decorate([
    (0, common_1.Controller)('rfid'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('RFID'),
    __metadata("design:paramtypes", [rfid_service_1.RfidService])
], RfidController);
//# sourceMappingURL=rfid.controller.js.map