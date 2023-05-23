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
exports.BluetoothService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BluetoothService = class BluetoothService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBluetoothDto, requestUser) {
        if (requestUser.id !== createBluetoothDto.userId) {
            throw new common_1.HttpException('Users only changes their own macs', common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = await this.prisma.user.findFirstOrThrow({
            where: { id: createBluetoothDto.userId },
            include: { bluetooth: true }
        });
        if (user.bluetooth) {
            throw new common_1.HttpException('User already has a mac', common_1.HttpStatus.FORBIDDEN);
        }
        let bluetooth;
        try {
            bluetooth = await this.prisma.bluetooth.create({
                data: {
                    content: createBluetoothDto.content,
                    User: { connect: { id: createBluetoothDto.userId } }
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
        return bluetooth;
    }
    findAll() {
        try {
            return this.prisma.bluetooth.findMany();
        }
        catch (error) {
            throw new Error();
        }
    }
    async findAllMacsByEnvironment(body) {
        const env = await this.prisma.environment.findFirst({
            where: { id: body.envId },
            include: {
                admins: { include: { bluetooth: true } },
                frequenters: { include: { bluetooth: true } }
            }
        });
        if (!env) {
            throw new common_1.HttpException("Environment not found", common_1.HttpStatus.NOT_FOUND);
        }
        const bluetooths = [];
        env.admins.forEach(admin => {
            if (admin.bluetooth)
                bluetooths.push(admin.bluetooth);
        });
        env.frequenters.forEach(frequenter => {
            if (frequenter.bluetooth)
                bluetooths.push(frequenter.bluetooth);
        });
        try {
            return bluetooths;
        }
        catch (error) {
            throw new Error();
        }
    }
    findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('Invalid Input. ID must be sent.');
        }
        return this.prisma.bluetooth.findUnique({
            where: { id }
        });
    }
    update(id, updateBluetoothDto, userId) {
        if (userId !== id) {
            throw new common_1.HttpException("Users only update their own macs", common_1.HttpStatus.UNAUTHORIZED);
        }
        const validFields = ['content', 'userId'];
        const invalidFields = Object.keys(updateBluetoothDto).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`);
        }
        try {
            return this.prisma.bluetooth.update({
                where: { id },
                data: updateBluetoothDto
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
    remove(id) {
        return this.prisma.tag.delete({
            where: { id }
        });
    }
};
BluetoothService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BluetoothService);
exports.BluetoothService = BluetoothService;
//# sourceMappingURL=bluetooth.service.js.map