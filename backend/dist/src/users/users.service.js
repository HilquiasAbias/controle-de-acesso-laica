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
const tags_service_1 = require("../tags/tags.service");
exports.roundsOfHashing = 10;
let UsersService = class UsersService {
    constructor(prisma, Tags = new tags_service_1.TagsService(prisma)) {
        this.prisma = prisma;
        this.Tags = Tags;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, exports.roundsOfHashing);
        let user;
        if (createUserDto.role === 'ADMIN') {
            user = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    registration: createUserDto.registration,
                    role: createUserDto.role,
                    password: hashedPassword,
                    adminEnvironment: createUserDto.envId ? { connect: { id: createUserDto.envId } } : undefined
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
                    frequenterEnvironment: createUserDto.envId ? { connect: { id: createUserDto.envId } } : undefined
                }
            });
        }
        if (createUserDto.bluetooth) {
            await this.prisma.bluetooth.create({
                data: { content: createUserDto.bluetooth }
            });
        }
        if (createUserDto.tag) {
            await this.Tags.create({ content: createUserDto.tag, userId: user.id });
        }
        return user;
    }
    async findAllFrequenters() {
        return await this.prisma.user.findMany({
            where: { role: 'FREQUENTER' }
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
                tag: true,
                bluetooth: true
            }
        });
        return user;
    }
    async update(id, role, updateUserDto, requestUser) {
        if (requestUser.role === 'FREQUENTER' && requestUser.id !== id) {
            throw new common_1.UnauthorizedException("Can't update");
        }
        if (requestUser.role === 'ADMIN' && role === 'ADMIN' && requestUser.id !== id) {
            throw new common_1.UnauthorizedException("A admin can't update other admin");
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
        if (isNaN(id)) {
            throw new common_1.BadRequestException('Invalid input. ID must be a number.');
        }
        const deletedUser = await this.prisma.user.delete({
            where: { id }
        });
        return deletedUser;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tags_service_1.TagsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map