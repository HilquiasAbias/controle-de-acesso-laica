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
exports.UsersService = exports.roundsOfHashing = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const class_validator_1 = require("class-validator");
exports.roundsOfHashing = 10;
let UsersService = exports.UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto, requestUser) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, exports.roundsOfHashing);
        let user;
        if (createUserDto.role === 'ADMIN') {
            user = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    registration: createUserDto.registration,
                    role: createUserDto.role,
                    password: hashedPassword,
                    adminEnvironment: createUserDto.envId ? { connect: { id: createUserDto.envId } } : undefined,
                    RFID: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
                }
            });
        }
        else {
            user = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    registration: createUserDto.registration,
                    role: createUserDto.role,
                    password: hashedPassword,
                    frequenterEnvironment: createUserDto.envId ? { connect: { id: createUserDto.envId } } : undefined,
                    RFID: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
                }
            });
        }
        return user;
    }
    async findAllFrequenters() {
        return await this.prisma.user.findMany({
            where: { role: 'FREQUENTER' },
            include: { RFID: true }
        });
    }
    async findAllFrequentersByEnvironment(envId) {
        return await this.prisma.user.findMany({
            where: { role: 'FREQUENTER', environmentFrequenterId: envId },
            include: { RFID: true }
        });
    }
    async findAllAdminsByEnvironment(envId) {
        return await this.prisma.user.findMany({
            where: { role: 'ADMIN', environmentAdminId: envId },
            include: { RFID: true }
        });
    }
    async findAllAdmins() {
        return await this.prisma.user.findMany({
            where: { role: 'ADMIN' }
        });
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('Invalid Input. ID must be sent.');
        }
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id },
            include: {
                adminEnvironment: true,
                frequenterEnvironment: true,
                Bluetooth: true,
                RFID: true
            }
        });
        return user;
    }
    async update(id, role, updateUserDto, requestUser) {
        if (requestUser.role === 'FREQUENTER' && requestUser.id !== id) {
            throw new common_1.UnauthorizedException("Can't update");
        }
        if (requestUser.role === 'ADMIN' && role === 'ADMIN' && requestUser.id !== id) {
            throw new common_1.UnauthorizedException("An admin cannot update another admin");
        }
        const validFields = ['name', 'registration', 'password', 'role'];
        const invalidFields = Object.keys(updateUserDto).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`);
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, exports.roundsOfHashing);
        }
        const updatedUser = await this.prisma.user.update({
            data: {
                name: updateUserDto.name,
                registration: updateUserDto.registration,
                password: updateUserDto.password,
                role: updateUserDto.role
            },
            where: { id }
        });
        return updatedUser;
    }
    async remove(id) {
        if ((0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid id input');
        }
        const deletedUser = await this.prisma.user.delete({
            where: { id }
        });
        return deletedUser;
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map