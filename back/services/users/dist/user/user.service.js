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
exports.UserService = exports.roundsOfHashing = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const microservices_1 = require("@nestjs/microservices");
const class_validator_1 = require("class-validator");
exports.roundsOfHashing = 10;
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const validFields = ['email', 'name', 'registration', 'password', 'role', 'tag'];
        const invalidFields = Object.keys(createUserDto).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new microservices_1.RpcException({
                statusCode: 400,
                message: `Invalid fields provided: ${invalidFields.join(', ')}`,
                error: 'Bad Request',
            });
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, exports.roundsOfHashing);
        let user;
        try {
            user = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    registration: createUserDto.registration,
                    email: createUserDto.email,
                    role: createUserDto.role,
                    password: hashedPassword,
                    Rfid: createUserDto.tag ? { create: { tag: createUserDto.tag } } : undefined
                },
                include: {
                    Rfid: true
                }
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new microservices_1.RpcException({
                    statusCode: 409,
                    message: `Already exists: ${error.meta.target}`,
                    error: 'Conflict',
                });
            }
            else {
                throw new microservices_1.RpcException({
                    statusCode: 403,
                    message: "Can't create user",
                    error: 'Forbidden',
                });
            }
        }
        if (createUserDto.envId) { }
        return user;
    }
    async findAllFrequenters() {
        return await this.prisma.user.findMany({
            where: { role: 'FREQUENTER' },
            include: { Rfid: true }
        });
    }
    async findAllAdmins() {
        return await this.prisma.user.findMany({
            where: { role: 'ADMIN' },
            include: { Rfid: true }
        });
    }
    async findAllEnvironmentManager() {
        return await this.prisma.user.findMany({
            where: { role: 'ENVIRONMENT_MANAGER' },
            include: { Rfid: true }
        });
    }
    async findOne(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new microservices_1.RpcException({
                statusCode: 400,
                message: 'Invalid id input',
                error: 'Bad Request',
            });
        }
        try {
            return await this.prisma.user.findFirstOrThrow({
                where: { id },
                include: { Rfid: true }
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new microservices_1.RpcException({
                    statusCode: 409,
                    message: error.message,
                    error: 'Conflict',
                });
            }
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map