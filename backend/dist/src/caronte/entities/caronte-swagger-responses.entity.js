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
exports.CaronteValidResponseEntity = exports.CaronteUnauthorizedResponseEntity = exports.CaronteNotFoundResponseEntity = exports.CaronteIdParamInvalidResponseEntity = exports.CaronteConflictResponseEntity = exports.CaronteBadRequestResponseEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
class CaronteBadRequestResponseEntity {
}
exports.CaronteBadRequestResponseEntity = CaronteBadRequestResponseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiResponseProperty)({ example: [
            'Invalid input data for ${}',
            'Required field missing: ${}',
            'Invalid field value: ${}',
            'Invalid fields provided: [${}...]',
            'ip must be an ip address',
            'esp must be a MAC Address'
        ] }),
    __metadata("design:type", String)
], CaronteBadRequestResponseEntity.prototype, "message", void 0);
class CaronteConflictResponseEntity {
}
exports.CaronteConflictResponseEntity = CaronteConflictResponseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiResponseProperty)({ example: 'Unique constraint failed on the field: ${}' }),
    __metadata("design:type", String)
], CaronteConflictResponseEntity.prototype, "message", void 0);
class CaronteIdParamInvalidResponseEntity {
}
exports.CaronteIdParamInvalidResponseEntity = CaronteIdParamInvalidResponseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiResponseProperty)({ example: 'Invalid input id' }),
    __metadata("design:type", String)
], CaronteIdParamInvalidResponseEntity.prototype, "message", void 0);
class CaronteNotFoundResponseEntity {
}
exports.CaronteNotFoundResponseEntity = CaronteNotFoundResponseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiResponseProperty)({ example: 'No Caronte found' }),
    __metadata("design:type", String)
], CaronteNotFoundResponseEntity.prototype, "message", void 0);
class CaronteUnauthorizedResponseEntity {
}
exports.CaronteUnauthorizedResponseEntity = CaronteUnauthorizedResponseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiResponseProperty)({ example: [
            'Unauthorized caronte access',
            'Unauthorized user access',
            'Unauthorized'
        ] }),
    __metadata("design:type", String)
], CaronteUnauthorizedResponseEntity.prototype, "message", void 0);
class CaronteValidResponseEntity {
}
exports.CaronteValidResponseEntity = CaronteValidResponseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CaronteValidResponseEntity.prototype, "access", void 0);
//# sourceMappingURL=caronte-swagger-responses.entity.js.map