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
const class_validator_1 = require("class-validator");
const bcrypt = require("bcrypt");
let CaronteService = exports.CaronteService = class CaronteService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCaronteDto) {
        try {
            return await this.prisma.caronte.create({
                data: createCaronteDto,
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException("Caronte already exists", common_1.HttpStatus.CONFLICT);
            }
            else if (error.code === 'P2003') {
                throw new common_1.HttpException("Environment not found", common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException("Something went wrong", common_1.HttpStatus.FORBIDDEN);
            }
        }
    }
    async findAll() {
        return await this.prisma.caronte.findMany();
    }
    async findAllByEnvironment(envId) {
        if (!(0, class_validator_1.isUUID)(envId)) {
            throw new common_1.HttpException("Invalid input id", common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.caronte.findMany({
            where: {
                environmentId: envId
            }
        });
    }
    async findOne(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.HttpException("Invalid input id", common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.caronte.findFirstOrThrow({
            where: { id }
        });
    }
    async update(id, updateCaronteDto) {
        return `This action updates a #${id} caronte`;
    }
    async remove(id) {
        return `This action removes a #${id} caronte`;
    }
    async findUserByTag(tag, users) {
        let user;
        user = users.admins.find(admin => admin.rfid.tag === tag);
        if (!user) {
            user = users.frequenters.find(frequenter => frequenter.rfid.tag === tag);
        }
        return user;
    }
    async findUserByMac(mac, users) {
        let user;
        user = users.admins.find(admin => admin.mac === mac);
        if (!user) {
            user = users.frequenters.find(frequenter => frequenter.mac === mac);
        }
        return user;
    }
    async findUserByData(registration, password, users) {
        let user;
        user = users.admins.find(admin => admin.registration === registration);
        if (!user) {
            user = users.frequenters.find(frequenter => frequenter.registration === registration);
        }
        if (!user)
            return undefined;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user : undefined;
    }
    async isCurrentTimeValidForUser(accessTimes) {
        if (!accessTimes || accessTimes.length === 0) {
            return false;
        }
        const currentTime = new Date();
        console.log((await this.prisma.accessTime.findFirst()).startTime);
        const currentDayOfWeek = this.getDayOfWeek(currentTime);
        const isValidTime = accessTimes.some((accessTime) => accessTime.dayOfWeek === currentDayOfWeek &&
            this.isTimeWithinRange(currentTime, accessTime.startTime, accessTime.endTime));
        return isValidTime;
    }
    getDayOfWeek(date) {
        const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const dayIndex = date.getDay();
        return daysOfWeek[dayIndex];
    }
    isTimeWithinRange(time, startTime, endTime) {
        return time >= startTime && time <= endTime;
    }
    async anObolForCharon(obolForCharon) {
        const validFields = ['ip', 'esp', 'carontePassword', 'userPassword', 'userRegistration', 'userId', 'userDeviceMac', 'userTagRFID'];
        const invalidFields = Object.keys(obolForCharon).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.HttpException(`Invalid fields provided: ${invalidFields.join(', ')}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const caronte = await this.prisma.caronte.findFirstOrThrow({
            where: {
                esp: obolForCharon.esp,
                ip: obolForCharon.ip
            },
            include: {
                Environment: {
                    select: {
                        admins: {
                            include: {
                                accessTimes: true,
                                rfid: true
                            }
                        },
                        frequenters: {
                            include: {
                                accessTimes: true,
                                rfid: true
                            }
                        }
                    }
                }
            }
        });
        const isCarontePasswordValid = await bcrypt.compare(obolForCharon.carontePassword, caronte.password);
        if (!isCarontePasswordValid) {
            throw new common_1.HttpException('Unauthorized caronte access', common_1.HttpStatus.UNAUTHORIZED);
        }
        let user;
        if (obolForCharon.userTagRFID) {
            user = await this.findUserByTag(obolForCharon.userTagRFID, caronte.Environment);
        }
        if (!user && obolForCharon.userDeviceMac) {
            user = await this.findUserByMac(obolForCharon.userDeviceMac, caronte.Environment);
        }
        if (!user && obolForCharon.userRegistration) {
            user = await this.findUserByData(obolForCharon.userRegistration, obolForCharon.userPassword, caronte.Environment);
        }
        if (!user) {
            throw new common_1.HttpException('Unauthorized user access', common_1.HttpStatus.UNAUTHORIZED);
        }
        const isUserAccessTimeValid = await this.isCurrentTimeValidForUser(user.accessTimes);
        if (!isUserAccessTimeValid) {
            throw new common_1.HttpException('Unauthorized user access', common_1.HttpStatus.UNAUTHORIZED);
        }
        return {
            access: true
        };
    }
};
exports.CaronteService = CaronteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CaronteService);
//# sourceMappingURL=caronte.service.js.map