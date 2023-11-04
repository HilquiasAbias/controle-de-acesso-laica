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
exports.LogController = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("./log.service");
const create_log_dto_1 = require("./dto/create-log.dto");
const swagger_1 = require("@nestjs/swagger");
let LogController = exports.LogController = class LogController {
    constructor(logService) {
        this.logService = logService;
    }
    create(createLogDto) {
        return this.logService.create(createLogDto);
    }
    findAll(amount) {
        const amountInt = parseInt(amount);
        return this.logService.findAll(amountInt);
    }
    findAllByTopic(topic, amount) {
        const amountInt = parseInt(amount);
        return this.logService.findAllByTopic(topic, amountInt);
    }
    findOne(id) {
        return this.logService.findAllByCaronte(id);
    }
    clear(topic) {
        return this.logService.clear(topic);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_log_dto_1.CreateLogDto]),
    __metadata("design:returntype", void 0)
], LogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':amount'),
    __param(0, (0, common_1.Param)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('topic/:topic/:amount'),
    __param(0, (0, common_1.Param)('topic')),
    __param(1, (0, common_1.Param)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LogController.prototype, "findAllByTopic", null);
__decorate([
    (0, common_1.Get)('device/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('topic'),
    __param(0, (0, common_1.Query)('topic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LogController.prototype, "clear", null);
exports.LogController = LogController = __decorate([
    (0, common_1.Controller)('log'),
    (0, swagger_1.ApiTags)('Log'),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LogController);
//# sourceMappingURL=log.controller.js.map