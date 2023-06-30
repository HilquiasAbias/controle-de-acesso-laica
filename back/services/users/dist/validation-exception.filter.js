"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const class_validator_1 = require("class-validator");
const rxjs_1 = require("rxjs");
let ValidationExceptionFilter = class ValidationExceptionFilter extends microservices_1.BaseRpcExceptionFilter {
    catch(exception, host) {
        if (exception instanceof Array && exception.every(item => item instanceof class_validator_1.ValidationError)) {
            const errors = exception.map((error) => {
                const { constraints } = error;
                const property = Object.keys(constraints)[0];
                const message = constraints[property];
                return {
                    property,
                    message,
                };
            });
            return (0, rxjs_1.throwError)(new microservices_1.RpcException({
                statusCode: 400,
                message: 'Validation failed',
                error: 'Bad Request',
                errors,
            }));
        }
        return super.catch(exception, host);
    }
};
ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)()
], ValidationExceptionFilter);
exports.ValidationExceptionFilter = ValidationExceptionFilter;
//# sourceMappingURL=validation-exception.filter.js.map