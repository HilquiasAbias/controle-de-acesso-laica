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
exports.EnvironmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
const luxon_1 = require("luxon");
let EnvironmentsService = exports.EnvironmentsService = class EnvironmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEnvironmentDto) {
        const env = await this.prisma.environment.create({
            data: {
                name: createEnvironmentDto.name,
                description: createEnvironmentDto.description,
                admins: createEnvironmentDto.adminId ? { connect: { id: createEnvironmentDto.adminId } } : undefined
            }
        });
        return env;
    }
    async addUserInEnvironment(data) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: data.userId },
        });
        if (user.role !== data.role) {
            throw new common_1.HttpException('User role is different of role provided', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            if (user.role === 'ADMIN') {
                await this.prisma.environment.update({
                    where: { id: data.envId },
                    data: {
                        admins: { connect: { id: data.userId } }
                    }
                });
            }
            else {
                await this.prisma.environment.update({
                    where: { id: data.envId },
                    data: {
                        frequenters: { connect: { id: data.userId } }
                    }
                });
            }
            if (data.accessTime && data.role === 'FREQUENTER') {
                await Promise.all(data.accessTime.map(async (accessTime) => {
                    const { day, startTime, endTime } = accessTime;
                    await this.prisma.accessTime.create({
                        data: {
                            userId: user.id,
                            dayOfWeek: day,
                            startTime: luxon_1.DateTime.fromFormat(startTime, 'HH:mm:ss').toISO(),
                            endTime: luxon_1.DateTime.fromFormat(endTime, 'HH:mm:ss').toISO(),
                        }
                    });
                }));
            }
            return {
                status: 201,
                message: 'User successfully added.'
            };
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.HttpException("Record not found", common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.HttpException("Can't add user", common_1.HttpStatus.FORBIDDEN);
            }
        }
    }
    async findAll() {
        return await this.prisma.environment.findMany({
            include: {
                admins: true,
                frequenters: true,
                carontes: true
            }
        });
    }
    async findOne(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.HttpException("Invalid id input", common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.environment.findFirstOrThrow({
            where: { id },
            include: {
                admins: true,
                frequenters: true,
                carontes: true
            }
        });
    }
    async update(id, updateEnvironmentDto) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.HttpException("Invalid id input", common_1.HttpStatus.BAD_REQUEST);
        }
        const validFields = ['name', 'description', 'adminId'];
        const invalidFields = Object.keys(updateEnvironmentDto).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.HttpException(`Invalid fields provided: ${invalidFields.join(', ')}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.environment.update({
            data: updateEnvironmentDto,
            where: { id }
        });
    }
    async remove(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.HttpException("Invalid id input", common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.environment.delete({
            where: { id }
        });
    }
};
exports.EnvironmentsService = EnvironmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnvironmentsService);
//# sourceMappingURL=environments.service.js.map