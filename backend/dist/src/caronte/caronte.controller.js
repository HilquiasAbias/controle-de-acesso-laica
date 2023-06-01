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
exports.CaronteController = void 0;
const common_1 = require("@nestjs/common");
const caronte_service_1 = require("./caronte.service");
const create_caronte_dto_1 = require("./dto/create-caronte.dto");
const update_caronte_dto_1 = require("./dto/update-caronte.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const obol_for_caronte_dto_1 = require("./dto/obol-for-caronte.dto");
let CaronteController = class CaronteController {
    constructor(caronteService) {
        this.caronteService = caronteService;
    }
    obol(obolForCharonDto) {
        return this.caronteService.anObolForCharon(obolForCharonDto);
    }
    create(createCaronteDto) {
        return this.caronteService.create(createCaronteDto);
    }
    findAll() {
        return this.caronteService.findAll();
    }
    findOne(id) {
        return this.caronteService.findOne(+id);
    }
    update(id, updateCaronteDto) {
        return this.caronteService.update(+id, updateCaronteDto);
    }
    remove(id) {
        return this.caronteService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('obol'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [obol_for_caronte_dto_1.ObolForCharonDto]),
    __metadata("design:returntype", void 0)
], CaronteController.prototype, "obol", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_caronte_dto_1.CreateCaronteDto]),
    __metadata("design:returntype", void 0)
], CaronteController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CaronteController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CaronteController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_caronte_dto_1.UpdateCaronteDto]),
    __metadata("design:returntype", void 0)
], CaronteController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CaronteController.prototype, "remove", null);
CaronteController = __decorate([
    (0, common_1.Controller)('caronte'),
    __metadata("design:paramtypes", [caronte_service_1.CaronteService])
], CaronteController);
exports.CaronteController = CaronteController;
//# sourceMappingURL=caronte.controller.js.map