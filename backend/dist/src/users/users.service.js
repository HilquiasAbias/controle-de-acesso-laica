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
exports.roundsOfHashing = 10;
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, exports.roundsOfHashing);
        let user;
        let tag;
        let bluetooth;
        try {
            if (createUserDto.tag) {
                tag = await this.prisma.tag.create({
                    data: { content: createUserDto.tag }
                });
            }
            if (createUserDto.bluetooth) {
                bluetooth = await this.prisma.bluetooth.create({
                    data: { content: createUserDto.bluetooth }
                });
            }
            user = await this.prisma.user.create({
                data: Object.assign(Object.assign({}, createUserDto), { tag: createUserDto.tag ? { connect: { id: tag.id } } : undefined, bluetooth: createUserDto.bluetooth ? { connect: { id: bluetooth.id } } : undefined, password: hashedPassword }),
            });
            return user;
        }
        catch (error) {
            throw new Error('Erro ao criar usuário.');
        }
    }
    async findAll() {
        try {
            return await this.prisma.user.findMany({
                include: {
                    adminEnvironment: true,
                    frequenterEnvironment: true,
                    tag: true,
                    bluetooth: true
                }
            });
        }
        catch (error) {
            throw new Error('Erro ao buscar usuários.');
        }
    }
    async findOne(id) {
        try {
            const user = await this.prisma.user.findFirst({
                where: { id },
                include: {
                    adminEnvironment: true,
                    frequenterEnvironment: true,
                    tag: true,
                    bluetooth: true
                }
            });
            if (!user) {
                throw new common_1.NotFoundException('Usuário não encontrado.');
            }
            return user;
        }
        catch (error) {
            throw new Error('Erro ao buscar usuário.');
        }
    }
    async update(id, updateUserDto) {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, exports.roundsOfHashing);
        }
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { tag: true, bluetooth: true },
        });
        if (!user) {
            throw new common_1.HttpException('User not found.', common_1.HttpStatus.NOT_FOUND);
        }
        let tag;
        let bluetooth;
        if (updateUserDto.tag) {
            if (!user.tag) {
                tag = await this.prisma.tag.create({
                    data: { content: updateUserDto.tag },
                });
            }
            else {
                tag = await this.prisma.tag.update({
                    where: { id: user.tag.id },
                    data: { content: updateUserDto.tag },
                });
            }
        }
        if (!tag) {
            throw new common_1.HttpException("Can't update tag.", common_1.HttpStatus.FORBIDDEN);
        }
        if (updateUserDto.bluetooth) {
            if (!user.bluetooth) {
                bluetooth = await this.prisma.bluetooth.create({
                    data: { content: updateUserDto.bluetooth },
                });
            }
            else {
                bluetooth = await this.prisma.bluetooth.update({
                    where: { id: user.bluetooth.id },
                    data: { content: updateUserDto.bluetooth },
                });
            }
        }
        if (!bluetooth) {
            throw new common_1.HttpException("Can't update bluetooth.", common_1.HttpStatus.FORBIDDEN);
        }
        const updatedUser = await this.prisma.user.update({
            data: Object.assign(Object.assign({}, updateUserDto), { tag: tag ? { connect: { id: tag.id } } : undefined, bluetooth: bluetooth ? { connect: { id: bluetooth.id } } : undefined }),
            where: { id }
        });
        if (!updatedUser) {
            throw new common_1.HttpException("Can't update user.", common_1.HttpStatus.FORBIDDEN);
        }
        return updatedUser;
    }
    async remove(id) {
        try {
            const deletedUser = await this.prisma.user.delete({
                where: { id }
            });
            if (!deletedUser) {
                throw new common_1.NotFoundException('Usuário não encontrado.');
            }
            return deletedUser;
        }
        catch (error) {
            throw new Error('Erro ao deletar usuário.');
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map