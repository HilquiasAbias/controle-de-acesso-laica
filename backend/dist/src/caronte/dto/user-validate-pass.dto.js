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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidatePassDto = void 0;
const class_validator_1 = require("class-validator");
class UserValidatePassDto {
}
__decorate([
    (0, class_validator_1.IsIP)(),
    __metadata("design:type", String)
], UserValidatePassDto.prototype, "ip", void 0);
__decorate([
    (0, class_validator_1.IsMACAddress)(),
    __metadata("design:type", String)
], UserValidatePassDto.prototype, "esp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserValidatePassDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserValidatePassDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsMACAddress)(),
    __metadata("design:type", String)
], UserValidatePassDto.prototype, "mac", void 0);
__decorate([
    (0, class_validator_1.IsHexadecimal)(),
    (0, class_validator_1.Length)(8, 16),
    __metadata("design:type", String)
], UserValidatePassDto.prototype, "tag", void 0);
exports.UserValidatePassDto = UserValidatePassDto;
//# sourceMappingURL=user-validate-pass.dto.js.map