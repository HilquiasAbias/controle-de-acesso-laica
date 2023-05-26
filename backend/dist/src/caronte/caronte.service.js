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
exports.CaronteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let CaronteService = class CaronteService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCaronteDto) {
        const hashedPassword = await bcrypt.hash(createCaronteDto.password, users_service_1.roundsOfHashing);
        try {
            return await this.prisma.caronte.create({
                data: {
                    ip: createCaronteDto.ip,
                    esp: createCaronteDto.esp,
                    password: hashedPassword,
                    Environment: {
                        connect: { id: createCaronteDto.environmentId }
                    }
                }
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException("Caronte alredy exists.", common_1.HttpStatus.CONFLICT);
            }
            else if (error.code === 'P2025') {
                throw new common_1.HttpException("Record not found", common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.HttpException("Can't create caronte.", common_1.HttpStatus.FORBIDDEN);
            }
        }
    }
    async findAll() {
        try {
            return await this.prisma.caronte.findMany();
        }
        catch (error) {
            throw new common_1.HttpException("Something goes wrong", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.HttpException('Invalid Input. ID must be sent', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.caronte.findFirstOrThrow({
            where: { id }
        });
    }
    async update(id, updateCaronteDto) {
        if (!id) {
            throw new common_1.HttpException('Invalid Input. ID must be sent', common_1.HttpStatus.BAD_REQUEST);
        }
        const validFields = ['ip', 'esp', 'password', 'environmentId'];
        const invalidFields = Object.keys(updateCaronteDto).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`);
        }
        if (updateCaronteDto.password) {
            updateCaronteDto.password = await bcrypt.hash(updateCaronteDto.password, users_service_1.roundsOfHashing);
        }
        return await this.prisma.caronte.update({
            where: { id },
            data: updateCaronteDto
        });
    }
    async remove(id) {
        return `This action removes a #${id} caronte`;
    }
};
CaronteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CaronteService);
exports.CaronteService = CaronteService;
//# sourceMappingURL=caronte.service.js.map