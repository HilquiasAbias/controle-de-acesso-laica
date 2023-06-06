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
const core_1 = require("@nestjs/core");
const client_1 = require("@prisma/client");
let PrismaClientExceptionFilter = exports.PrismaClientExceptionFilter = class PrismaClientExceptionFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        console.error(exception.message);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const message = exception.message.replace(/\n/g, '');
        switch (exception.code) {
            case 'P2002': {
                const status = common_1.HttpStatus.CONFLICT;
                const errorMessage = message.match(/`([^`]+)`\)$/);
                const errorField = errorMessage ? errorMessage[1] : 'Unknown field';
                response.status(status).json({
                    statusCode: status,
                    message: `Unique constraint failed on the field: (${errorField})`,
                    error: 'Conflict'
                });
                break;
            }
            case 'P2025': {
                const status = common_1.HttpStatus.NOT_FOUND;
                const regex = /The (\w+) with value \(.+\) was not found in/;
                const match = message.match(regex);
                const entityName = match ? match[1] : null;
                const errorMessage = message.match(/`([^`]+)`\)$/);
                response.status(status).json({
                    statusCode: status,
                    message: entityName ? `The requested ${entityName} was not found.` : 'Record not found',
                    error: 'Not found'
                });
                break;
            }
            case 'P2101': {
                const status = common_1.HttpStatus.FORBIDDEN;
                const regex = /The (\w+) operation is not permitted/;
                const match = message.match(regex);
                const operationName = match ? match[1] : 'Unknown operation';
                response.status(status).json({
                    statusCode: status,
                    message: `The requested ${operationName} operation is forbidden.`,
                });
                break;
            }
            case 'P4001': {
                const status = common_1.HttpStatus.BAD_REQUEST;
                const regex = /Invalid input for (\w+)/;
                const match = message.match(regex);
                const inputName = match ? match[1] : 'Unknown input';
                response.status(status).json({
                    statusCode: status,
                    message: `Invalid input data for ${inputName}.`,
                });
                break;
            }
            case 'P4002': {
                const status = common_1.HttpStatus.BAD_REQUEST;
                const regex = /Required field\((.+)\)/;
                const match = message.match(regex);
                const errorField = match ? match[1] : 'Unknown field';
                response.status(status).json({
                    statusCode: status,
                    message: `Required field missing: ${errorField}`,
                });
                break;
            }
            case 'P4003': {
                const status = common_1.HttpStatus.BAD_REQUEST;
                const regex = /Invalid field value\((.+)\)/;
                const match = message.match(regex);
                const errorField = match ? match[1] : 'Unknown field';
                response.status(status).json({
                    statusCode: status,
                    message: `Invalid field value: ${errorField}`,
                });
                break;
            }
            default:
                super.catch(exception, host);
                break;
        }
    }
};
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaClientExceptionFilter);
//# sourceMappingURL=prisma-client-exception.filter.js.map