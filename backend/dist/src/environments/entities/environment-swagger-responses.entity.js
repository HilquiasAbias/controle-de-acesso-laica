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
exports.UserAddedEntity = exports.EnvironmentNotFoundOnCreateResponseEntity = exports.EnvironmentNotFoundResponseEntity = exports.EnvironmentBadRequestResponseEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
class EnvironmentBadRequestResponseEntity {
}
exports.EnvironmentBadRequestResponseEntity = EnvironmentBadRequestResponseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiResponseProperty)({ example: [
            'User role is different of role provided',
            "envId should not be empty",
            "envId must be a UUID",
            "userId should not be empty",
            "userId must be a UUID",
            "role should not be empty",
            "role must be a string"
        ] }),
    __metadata("design:type", String)
], EnvironmentBadRequestResponseEntity.prototype, "message", void 0);
class EnvironmentNotFoundResponseEntity {
}
exports.EnvironmentNotFoundResponseEntity = EnvironmentNotFoundResponseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiResponseProperty)({ example: ['No Environment found', 'Environment not found'] }),
    __metadata("design:type", String)
], EnvironmentNotFoundResponseEntity.prototype, "message", void 0);
class EnvironmentNotFoundOnCreateResponseEntity {
}
exports.EnvironmentNotFoundOnCreateResponseEntity = EnvironmentNotFoundOnCreateResponseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiResponseProperty)({ example: 'Admin not found' }),
    __metadata("design:type", String)
], EnvironmentNotFoundOnCreateResponseEntity.prototype, "message", void 0);
class UserAddedEntity {
}
exports.UserAddedEntity = UserAddedEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UserAddedEntity.prototype, "added", void 0);
//# sourceMappingURL=environment-swagger-responses.entity.js.map