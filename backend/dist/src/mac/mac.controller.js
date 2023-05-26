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
exports.MacController = void 0;
const common_1 = require("@nestjs/common");
const mac_service_1 = require("./mac.service");
const create_mac_dto_1 = require("./dto/create-mac.dto");
const update_mac_dto_1 = require("./dto/update-mac.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const read_env_macs_dto_1 = require("./dto/read-env-macs.dto");
let MacController = class MacController {
    constructor(macService) {
        this.macService = macService;
    }
    create(createMacDto, req) {
        const requestUser = req.user;
        return this.macService.create(createMacDto, requestUser);
    }
    findAll() {
        return this.macService.findAll();
    }
    findAllByEnv(body) {
        return this.macService.findAllMacsByEnvironment(body);
    }
    findOne(id) {
        return this.macService.findOne(+id);
    }
    update(id, updateMacDto, req) {
        const userId = req.user.id;
        return this.macService.update(+id, updateMacDto, userId);
    }
    remove(id, req) {
        const userId = req.user.id;
        return this.macService.remove(+id, userId);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mac_dto_1.CreateMacDto, Object]),
    __metadata("design:returntype", void 0)
], MacController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MacController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('environment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [read_env_macs_dto_1.ReadEnvMacsDto]),
    __metadata("design:returntype", void 0)
], MacController.prototype, "findAllByEnv", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MacController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_mac_dto_1.UpdateMacDto, Object]),
    __metadata("design:returntype", void 0)
], MacController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MacController.prototype, "remove", null);
MacController = __decorate([
    (0, common_1.Controller)('mac'),
    __metadata("design:paramtypes", [mac_service_1.MacService])
], MacController);
exports.MacController = MacController;
//# sourceMappingURL=mac.controller.js.map