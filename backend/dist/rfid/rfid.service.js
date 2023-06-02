"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RfidService = void 0;
const common_1 = require("@nestjs/common");
let RfidService = exports.RfidService = class RfidService {
    create(createRfidDto) {
        return 'This action adds a new rfid';
    }
    findAll() {
        return `This action returns all rfid`;
    }
    findOne(id) {
        return `This action returns a #${id} rfid`;
    }
    update(id, updateRfidDto) {
        return `This action updates a #${id} rfid`;
    }
    remove(id) {
        return `This action removes a #${id} rfid`;
    }
};
exports.RfidService = RfidService = __decorate([
    (0, common_1.Injectable)()
], RfidService);
//# sourceMappingURL=rfid.service.js.map