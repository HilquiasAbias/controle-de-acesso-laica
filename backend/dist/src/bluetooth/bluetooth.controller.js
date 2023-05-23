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
exports.BluetoothController = void 0;
const common_1 = require("@nestjs/common");
const bluetooth_service_1 = require("./bluetooth.service");
const create_bluetooth_dto_1 = require("./dto/create-bluetooth.dto");
const update_bluetooth_dto_1 = require("./dto/update-bluetooth.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const read_env_macs_dto_1 = require("./dto/read-env-macs.dto");
let BluetoothController = class BluetoothController {
    constructor(bluetoothService) {
        this.bluetoothService = bluetoothService;
    }
    create(createBluetoothDto, req) {
        const requestUser = req.user;
        return this.bluetoothService.create(createBluetoothDto, requestUser);
    }
    findAll() {
        return this.bluetoothService.findAll();
    }
    findAllByEnv(body) {
        return this.bluetoothService.findAllMacsByEnvironment(body);
    }
    findOne(id) {
        return this.bluetoothService.findOne(+id);
    }
    update(id, updateBluetoothDto, req) {
        const userId = req.user.id;
        return this.bluetoothService.update(+id, updateBluetoothDto, userId);
    }
    remove(id) {
        return this.bluetoothService.remove(+id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bluetooth_dto_1.CreateBluetoothDto, Object]),
    __metadata("design:returntype", void 0)
], BluetoothController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BluetoothController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('environment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [read_env_macs_dto_1.ReadEnvMacsDto]),
    __metadata("design:returntype", void 0)
], BluetoothController.prototype, "findAllByEnv", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BluetoothController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bluetooth_dto_1.UpdateBluetoothDto, Object]),
    __metadata("design:returntype", void 0)
], BluetoothController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BluetoothController.prototype, "remove", null);
BluetoothController = __decorate([
    (0, common_1.Controller)('mac'),
    __metadata("design:paramtypes", [bluetooth_service_1.BluetoothService])
], BluetoothController);
exports.BluetoothController = BluetoothController;
//# sourceMappingURL=bluetooth.controller.js.map