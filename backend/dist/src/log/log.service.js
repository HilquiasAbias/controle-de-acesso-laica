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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let LogService = exports.LogService = class LogService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const caronte = await this.prisma.caronte.findFirstOrThrow({
            where: {
                esp: data.caronteMac
            },
        });
        const isPasswordValid = await bcrypt.compare(data.carontePassword, caronte.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Unauthorized caronte access', common_1.HttpStatus.UNAUTHORIZED);
        }
        let userDataResponse;
        try {
            await this.prisma.log.create({
                data: {
                    message: data.message,
                    topic: data.topic,
                    type: data.type,
                    caronte: { connect: { esp: data.caronteMac } },
                }
            });
        }
        catch (error) {
            console.log(error);
            if (error.code === 'P2025') {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            else if (error.code === 'P2002') {
                throw new common_1.HttpException('Already exists', common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException('Failed to create log', common_1.HttpStatus.FORBIDDEN);
            }
        }
        return {
            created: true
        };
    }
    async findAll() {
        return this.prisma.log.findMany();
    }
    async findAllByCaronte(id) {
        return this.prisma.log.findMany({
            where: { id }
        });
    }
    async findOne(id) {
        return this.prisma.log.findFirstOrThrow({
            where: { id }
        });
    }
};
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LogService);
//# sourceMappingURL=log.service.js.map