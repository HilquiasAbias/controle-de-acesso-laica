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
exports.MacService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MacService = class MacService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMacDto, requestUser) {
        if (requestUser.id !== createMacDto.userId) {
            throw new common_1.HttpException('Users only changes their own macs', common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = await this.prisma.user.findFirstOrThrow({
            where: { id: createMacDto.userId },
            include: { mac: true }
        });
        if (user.mac) {
            throw new common_1.HttpException('User already has a mac', common_1.HttpStatus.FORBIDDEN);
        }
        let mac;
        try {
            mac = await this.prisma.mac.create({
                data: {
                    content: createMacDto.content,
                    User: { connect: { id: createMacDto.userId } }
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException("mac alredy exists.", common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException("Can't create mac.", common_1.HttpStatus.FORBIDDEN);
            }
        }
        return mac;
    }
    findAll() {
        try {
            return this.prisma.mac.findMany();
        }
        catch (error) {
            throw new Error();
        }
    }
    async findAllMacsByEnvironment(body) {
        const env = await this.prisma.environment.findFirst({
            where: { id: body.envId },
            include: {
                admins: { include: { mac: true } },
                frequenters: { include: { mac: true } }
            }
        });
        if (!env) {
            throw new common_1.HttpException("Environment not found", common_1.HttpStatus.NOT_FOUND);
        }
        const macs = [];
        env.admins.forEach(admin => {
            if (admin.mac)
                macs.push(admin.mac);
        });
        env.frequenters.forEach(frequenter => {
            if (frequenter.mac)
                macs.push(frequenter.mac);
        });
        try {
            return macs;
        }
        catch (error) {
            throw new Error();
        }
    }
    findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('Invalid Input. ID must be sent.');
        }
        return this.prisma.mac.findFirstOrThrow({
            where: { id }
        });
    }
    update(id, updateMacDto, userId) {
        const validFields = ['content', 'userId'];
        const invalidFields = Object.keys(updateMacDto).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`);
        }
        if (isNaN(id)) {
            throw new common_1.HttpException("Id must be a number", common_1.HttpStatus.BAD_REQUEST);
        }
        if (userId !== id) {
            throw new common_1.HttpException("Users only update their own macs", common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            return this.prisma.mac.update({
                where: { id },
                data: updateMacDto
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.HttpException("Mac not found", common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.HttpException("Can't update mac.", common_1.HttpStatus.FORBIDDEN);
            }
        }
    }
    remove(id, userId) {
        if (!id) {
            throw new common_1.BadRequestException('Invalid Input. ID must be sent.');
        }
        if (userId !== id) {
            throw new common_1.HttpException("Users only delete their own macs", common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.prisma.mac.delete({
            where: { id }
        });
    }
};
MacService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MacService);
exports.MacService = MacService;
//# sourceMappingURL=mac.service.js.map