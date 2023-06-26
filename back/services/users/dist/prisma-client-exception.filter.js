"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const client_1 = require("@prisma/client");
const rxjs_1 = require("rxjs");
let PrismaClientExceptionFilter = class PrismaClientExceptionFilter extends microservices_1.BaseRpcExceptionFilter {
    catch(exception, host) {
        console.error(exception.message);
        switch (exception.code) {
            case 'P2002': {
                const errorMessage = exception.message.replace(/\n/g, '');
                const errorField = errorMessage.match(/`([^`]+)`\)$/)[1];
                return (0, rxjs_1.throwError)(new microservices_1.RpcException({
                    statusCode: 409,
                    message: `Unique constraint failed on the field: (${errorField})`,
                    error: 'Conflict',
                }));
            }
            case 'P2025': {
                const errorMessage = exception.message.replace(/\n/g, '');
                const match = errorMessage.match(/The (\w+) with value \(.+\) was not found in/);
                const entityName = match ? match[1] : null;
                return (0, rxjs_1.throwError)(new microservices_1.RpcException({
                    statusCode: 404,
                    message: entityName ? `The requested ${entityName} was not found.` : errorMessage,
                    error: 'Not found',
                }));
            }
            default:
                return super.catch(exception, host);
        }
    }
};
PrismaClientExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaClientExceptionFilter);
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter;
//# sourceMappingURL=prisma-client-exception.filter.js.map