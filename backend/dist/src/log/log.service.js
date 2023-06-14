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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let LogService = exports.LogService = class LogService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserForLog(data) {
        let userRegistration;
        let obolType;
        if (data.userTag) {
            userRegistration = await this.prisma.user.findFirstOrThrow({
                where: {
                    rfid: { tag: data.userTag }
                },
                select: {
                    registration: true
                }
            });
            data.userRegistration = userRegistration.registration;
            obolType = 'TAG_RFID';
        }
        if (data.userMac) {
            userRegistration = await this.prisma.user.findFirstOrThrow({
                where: {
                    mac: data.userMac
                },
                select: {
                    registration: true
                }
            });
            data.userRegistration = userRegistration.registration;
            obolType = 'DEVICE_MAC';
        }
        console.log(userRegistration);
        return { data, obolType };
    }
    async create(data) {
        const caronte = await this.prisma.caronte.findFirstOrThrow({
            where: {
                esp: data.caronteMac
            },
        });
        const isPasswordValid = await bcrypt.compare(data.carontePassword, caronte.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Unauthorized caronte access', common_1.HttpStatus.UNAUTHORIZED);
        }
        let userDataResponse;
        if (!data.userRegistration) {
            userDataResponse = await this.getUserForLog(data);
        }
        try {
            await this.prisma.log.create({
                data: {
                    message: userDataResponse.data.message,
                    obolType: userDataResponse.obolType,
                    type: userDataResponse.data.type,
                    caronte: { connect: { esp: userDataResponse.data.caronteMac } },
                    user: {
                        connect: {
                            registration: userDataResponse ? userDataResponse.data.userRegistration : data.userRegistration
                        }
                    }
                }
            });
        }
        catch (error) {
            console.log(error.code);
            if (error.code === 'P2025') {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            else if (error.code === 'P2002') {
                throw new common_1.HttpException('Already exists', common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException('Failed to create log', common_1.HttpStatus.FORBIDDEN);
            }
        }
        return {
            created: true
        };
    }
    async findAll() {
        return this.prisma.log.findMany();
    }
    async findAllByCaronte(caronteMac) {
        return this.prisma.log.findMany({
            where: { caronteMac }
        });
    }
    async findAllByUser(userRegistration) {
        return this.prisma.log.findMany({
            where: { userRegistration }
        });
    }
    async findOne(id) {
        return this.prisma.log.findFirstOrThrow({
            where: { id }
        });
    }
};
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LogService);
//# sourceMappingURL=log.service.js.map