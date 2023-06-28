"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroserviceExceptionInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let MicroserviceExceptionInterceptor = class MicroserviceExceptionInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)(error => {
            console.log(error);
            if (error.statusCode === 409) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.CONFLICT);
            }
            if (error.response.statusCode === 400) {
                throw new common_1.HttpException(error.response.message, common_1.HttpStatus.BAD_REQUEST);
            }
            if (error.statusCode === 403) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.FORBIDDEN);
            }
            throw new common_1.BadGatewayException('Erro ao processar a requisição via microsserviço');
        }));
    }
};
MicroserviceExceptionInterceptor = __decorate([
    (0, common_1.Injectable)()
], MicroserviceExceptionInterceptor);
exports.MicroserviceExceptionInterceptor = MicroserviceExceptionInterceptor;
//# sourceMappingURL=microservice-exception.interceptor.js.map