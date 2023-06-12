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
exports.RfidService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
let RfidService = exports.RfidService = class RfidService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRfidDto) {
        const user = await this.prisma.user.findFirstOrThrow({
            where: { id: createRfidDto.userId },
            include: { rfid: true }
        });
        if (user.rfid) {
            throw new common_1.HttpException('User already has a rfid', common_1.HttpStatus.FORBIDDEN);
        }
        let rfid;
        try {
            rfid = await this.prisma.rfid.create({
                data: {
                    tag: createRfidDto.tag,
                    User: { connect: { id: createRfidDto.userId } }
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException("rfid alredy exists.", common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException("Can't create rfid.", common_1.HttpStatus.FORBIDDEN);
            }
        }
        return rfid;
    }
    async findAll() {
        try {
            return await this.prisma.rfid.findMany({
                include: {
                    User: {
                        select: { name: true }
                    }
                }
            });
        }
        catch (error) {
            throw new Error();
        }
    }
    async findAllTagsByEnvironment(envId) {
        if (!(0, class_validator_1.isUUID)(envId)) {
            throw new common_1.HttpException("Invalid id input", common_1.HttpStatus.BAD_REQUEST);
        }
        const env = await this.prisma.environment.findFirst({
            where: { id: envId },
            include: {
                admins: { include: { rfid: true } },
                frequenters: { include: { rfid: true } }
            }
        });
        if (!env) {
            throw new common_1.HttpException("Environment not found", common_1.HttpStatus.NOT_FOUND);
        }
        const rfid = [];
        env.admins.forEach(admin => {
            if (admin.rfid)
                rfid.push(admin.rfid);
        });
        env.frequenters.forEach(frequenter => {
            if (frequenter.rfid)
                rfid.push(frequenter.rfid);
        });
        try {
            return rfid;
        }
        catch (error) {
            throw new Error();
        }
    }
    async findOne(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.HttpException("Invalid id input", common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.rfid.findFirstOrThrow({
            where: { id }
        });
    }
    async update(id, updateRfidDto, requestUser) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.HttpException('Invalid id input', common_1.HttpStatus.BAD_REQUEST);
        }
        const validFields = ['tag', 'userId'];
        const invalidFields = Object.keys(updateRfidDto).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`);
        }
        const rfid = await this.prisma.rfid.findFirstOrThrow({
            where: { id },
            include: { User: true }
        });
        if (requestUser.id !== rfid.User.id && rfid.User.role === 'ADMIN') {
            throw new common_1.HttpException("An admin cannot update another admin's rfid", common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            return await this.prisma.rfid.update({
                where: { id },
                data: updateRfidDto
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.HttpException("rfid not found", common_1.HttpStatus.NOT_FOUND);
            }
            else if (error.code === 'P2002') {
                throw new common_1.HttpException("This rfid already exists", common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException("Can't update rfid.", common_1.HttpStatus.FORBIDDEN);
            }
        }
    }
    async remove(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.HttpException("Invalid id input", common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.prisma.rfid.delete({
                where: { id }
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.HttpException("Rfid not found", common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.HttpException("Can't remove rfid", common_1.HttpStatus.FORBIDDEN);
            }
        }
    }
};
exports.RfidService = RfidService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RfidService);
//# sourceMappingURL=rfid.service.js.map