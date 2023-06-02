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
    findOne(id) {
        return this.rfidService.findOne(+id);
    }
    update(id, updateRfidDto) {
        return this.rfidService.update(+id, updateRfidDto);
    }
    remove(id) {
        return this.rfidService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rfid_dto_1.CreateRfidDto]),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rfid_dto_1.UpdateRfidDto]),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RfidController.prototype, "remove", null);
exports.RfidController = RfidController = __decorate([
    (0, common_1.Controller)('rfid'),
    __metadata("design:paramtypes", [rfid_service_1.RfidService])
], RfidController);
//# sourceMappingURL=rfid.controller.js.map