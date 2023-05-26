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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const bcrypt = require("bcrypt");
let AppService = class AppService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async teste(ip, params) {
        console.log(ip);
        if (ip !== params.ip) {
            throw new common_1.BadRequestException('Ip do cliente não é compatível com o fornecido na requisição');
        }
        const tag = await this.prisma.caronte.findUniqueOrThrow({
            where: { ip: params.ip },
            include: { Environment: true }
        });
        if (!tag) {
            throw new common_1.HttpException("Caronte not found", common_1.HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await bcrypt.compare(tag.password, params.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException("Invalid password", common_1.HttpStatus.UNAUTHORIZED);
        }
        console.log(tag);
        return {
            msg: 'Ok'
        };
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map