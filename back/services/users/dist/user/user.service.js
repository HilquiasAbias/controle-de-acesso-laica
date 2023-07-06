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
        const validFields = ['email', 'name', 'registration', 'password', 'roles', 'tag', 'mac'];
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
        for (const role of createUserDto.roles) {
            await this.prisma.userRoles.create({
                data: {
                    User: { connect: { id: user.id } },
                    role,
                },
            });
        }
        if (createUserDto.envId) { }
        return user;
    }
    async findAllFrequenters() {
        return await this.prisma.user.findMany({
            where: {
                Roles: {
                    some: {
                        role: 'FREQUENTER'
                    }
                },
                active: true
            },
            include: {
                Rfid: true,
                Device: true,
                Roles: true
            }
        });
    }
    async findAllAdmins() {
        return await this.prisma.user.findMany({
            where: {
                Roles: {
                    some: {
                        role: 'ADMIN'
                    }
                },
                active: true
            },
            include: {
                Rfid: true,
                Device: true,
                Roles: true
            }
        });
    }
    async findAllEnvironmentManager() {
        return await this.prisma.user.findMany({
            where: {
                Roles: {
                    some: {
                        role: 'ENVIRONMENT_MANAGER'
                    }
                },
                active: true
            },
            include: {
                Rfid: true,
                Device: true,
                Roles: true
            }
        });
    }
    async findAllInactive() {
        return await this.prisma.user.findMany({
            where: {
                active: false
            },
            include: {
                Rfid: true,
                Device: true,
                Roles: true
            }
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
                where: {
                    id,
                    active: true
                },
                include: {
                    Rfid: true,
                    Device: true,
                    Roles: true
                }
            });
        }
        catch (error) {
            console.log(error);
            if (error.code === 'P2025') {
                throw new microservices_1.RpcException({
                    statusCode: 404,
                    message: error.message,
                    error: 'Not Found',
                });
            }
        }
    }
    async updateGeneralData(id, updateUserGeneralDto) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new microservices_1.RpcException({
                statusCode: 400,
                message: 'Invalid id input',
                error: 'Bad Request',
            });
        }
        try {
            return await this.prisma.user.update({
                data: {
                    name: updateUserGeneralDto.name,
                    email: updateUserGeneralDto.email,
                    registration: updateUserGeneralDto.registration,
                    password: updateUserGeneralDto.password
                },
                where: { id }
            });
        }
        catch (error) {
            console.log(error);
            if (error.code === 'P2002') {
                throw new microservices_1.RpcException({
                    statusCode: 409,
                    message: `Already exists: ${error.meta.target}`,
                    error: 'Conflict',
                });
            }
            else if (error.code === 'P2025') {
                throw new microservices_1.RpcException({
                    statusCode: 404,
                    message: error.meta.cause,
                    error: 'Not Found',
                });
            }
            else {
                throw new microservices_1.RpcException({
                    statusCode: 403,
                    message: "Can't update user",
                    error: 'Forbidden',
                });
            }
        }
    }
    async updateRolesData(userId, updateUserRolesDto) {
        if (!(0, class_validator_1.isUUID)(userId)) {
            throw new microservices_1.RpcException({
                statusCode: 400,
                message: 'Invalid id input',
                error: 'Bad Request',
            });
        }
        console.log(updateUserRolesDto);
        const { rolesToAdd, rolesToRemove } = updateUserRolesDto;
        try {
            if (rolesToAdd && rolesToAdd.length > 0) {
                await Promise.all(rolesToAdd.map(async (role) => {
                    await this.prisma.userRoles.create({
                        data: {
                            role,
                            User: { connect: { id: userId } }
                        },
                    });
                }));
            }
            if (rolesToRemove && rolesToRemove.length > 0) {
                await Promise.all(rolesToRemove.map(async (role) => {
                    const userRole = await this.prisma.userRoles.findFirst({
                        where: {
                            userId,
                            role
                        }
                    });
                    console.log(userRole);
                    await this.prisma.userRoles.update({
                        where: {
                            id: userRole.id
                        },
                        data: {
                            active: false
                        }
                    });
                }));
            }
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new microservices_1.RpcException({
                    statusCode: 409,
                    message: `Already exists: ${error.meta.target}`,
                    error: 'Conflict',
                });
            }
            else if (error.code === 'P2025') {
                throw new microservices_1.RpcException({
                    statusCode: 404,
                    message: error.meta.cause,
                    error: 'Not Found',
                });
            }
        }
        return await this.prisma.userRoles.findMany({
            where: { userId }
        });
    }
    async changeUserStatus(userId, userStatusDto) {
        if (!(0, class_validator_1.isUUID)(userId)) {
            throw new microservices_1.RpcException({
                statusCode: 400,
                message: 'Invalid id input',
                error: 'Bad Request',
            });
        }
        let user;
        try {
            user = await this.prisma.user.findFirstOrThrow({
                where: { id: userId }
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new microservices_1.RpcException({
                    statusCode: 404,
                    message: error.message,
                    error: 'Not Found',
                });
            }
        }
        const { action } = userStatusDto;
        if (action === 'ACTIVATE' && user.active) {
            throw new microservices_1.RpcException({
                statusCode: 409,
                message: 'User is already active',
                error: 'Conflict',
            });
        }
        if (action === 'DEACTIVATE' && !user.active) {
            throw new microservices_1.RpcException({
                statusCode: 409,
                message: 'User is already inactive',
                error: 'Conflict',
            });
        }
        try {
            user = await this.prisma.user.update({
                where: { id: userId },
                data: {
                    active: action === 'ACTIVATE' ? true : false
                }
            });
            await this.updateUserRelationsStatus(userId, action);
            return user;
        }
        catch (error) {
            throw new microservices_1.RpcException({
                statusCode: 403,
                message: "Can't update user status",
                error: 'Forbidden',
            });
        }
    }
    async updateUserRelationsStatus(userId, action) {
        await this.prisma.$transaction(async (prisma) => {
            const flag = action === 'ACTIVATE' ? true : false;
            await prisma.rfid.updateMany({
                where: { userId },
                data: { active: flag },
            });
            await prisma.mobile.updateMany({
                where: { userId },
                data: { active: flag },
            });
            await prisma.userRoles.updateMany({
                where: { userId },
                data: { active: flag },
            });
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map