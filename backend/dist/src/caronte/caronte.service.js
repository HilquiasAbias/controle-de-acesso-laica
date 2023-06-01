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
    async findUserByTag(tag, envId) {
        const environment = await this.prisma.environment.findUnique({
            where: {
                id: envId
            },
            include: {
                admins: {
                    where: {
                        tag: {
                            content: tag
                        }
                    },
                    take: 1
                },
                frequenters: {
                    where: {
                        tag: {
                            content: tag
                        }
                    },
                    take: 1
                }
            },
        });
        if (environment.admins.length === 1) {
            return environment.admins.shift();
        }
        return environment.frequenters.shift();
    }
    async findUserByMac(mac, envId) {
        const environment = await this.prisma.environment.findUnique({
            where: {
                id: envId
            },
            include: {
                admins: {
                    where: {
                        mac: {
                            content: mac
                        }
                    },
                    take: 1
                },
                frequenters: {
                    where: {
                        mac: {
                            content: mac
                        }
                    },
                    take: 1
                }
            },
        });
        if (environment.admins.length === 1) {
            return environment.admins.shift();
        }
        return environment.frequenters.shift();
    }
    async findUserByData(registration, password, envId) {
        const environment = await this.prisma.environment.findUnique({
            where: {
                id: envId
            },
            include: {
                admins: {
                    where: {
                        registration,
                    },
                    take: 1
                },
                frequenters: {
                    where: {
                        registration
                    },
                    take: 1
                }
            },
        });
        let user;
        if (environment.admins.length === 1) {
            user = environment.admins.shift();
        }
        else {
            user = environment.frequenters.shift();
        }
        if (!user)
            return undefined;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user : undefined;
    }
    async isCurrentTimeValidForUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                accessTimes: true,
            },
        });
        if (!(user === null || user === void 0 ? void 0 : user.accessTimes)) {
            return false;
        }
        const currentTime = new Date();
        const currentDayOfWeek = this.getDayOfWeek(currentTime);
        const isValidTime = user.accessTimes.some((accessTime) => accessTime.dayOfWeek === currentDayOfWeek &&
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
        const validFields = ['ip', 'esp', 'carontePassword', 'userPassword', 'userRegister', 'userId', 'userDeviceMac', 'userTagRFID'];
        const invalidFields = Object.keys(obolForCharon).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`);
        }
        const caronte = await this.prisma.caronte.findFirst({
            where: {
                esp: obolForCharon.esp
            }
        });
        if (!caronte) {
            throw new common_1.UnauthorizedException('Unauthorized caronte access');
        }
        const isCarontePasswordValid = await bcrypt.compare(obolForCharon.carontePassword, caronte.password);
        if (!isCarontePasswordValid) {
            throw new common_1.UnauthorizedException('Unauthorized caronte access');
        }
        let user;
        let log;
        if (obolForCharon.userTagRFID) {
            user = await this.findUserByTag(obolForCharon.userTagRFID, caronte.environmentId);
        }
        if (!user && obolForCharon.userDeviceMac) {
            user = await this.findUserByTag(obolForCharon.userTagRFID, caronte.environmentId);
        }
        if (!user && obolForCharon.userRegister) {
            user = await this.findUserByData(obolForCharon.userRegister, obolForCharon.userPassword, caronte.environmentId);
        }
        if (!user) {
            log = await this.prisma.log.create({
                data: {
                    successful: false,
                    caronte: { connect: { id: caronte.id } }
                }
            });
            console.log(log);
            throw new common_1.UnauthorizedException('Unauthorized user access');
        }
        log = await this.prisma.log.create({
            data: {
                successful: true,
                caronte: { connect: { id: caronte.id } },
                user: { connect: { id: user.id } }
            }
        });
        console.log(log);
        return {
            access: 'valid'
        };
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
        try {
            return await this.prisma.caronte.update({
                where: { id },
                data: updateCaronteDto
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.HttpException("Environment not found", common_1.HttpStatus.NOT_FOUND);
            }
            else if (error.code === 'P2002') {
                throw new common_1.HttpException("This caronte already exists", common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException("Can't update caronte.", common_1.HttpStatus.FORBIDDEN);
            }
        }
    }
    async remove(id) {
        if (isNaN(id)) {
            throw new common_1.HttpException("Id must be a number", common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.caronte.delete({
            where: { id }
        });
    }
};
CaronteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CaronteService);
exports.CaronteService = CaronteService;
//# sourceMappingURL=caronte.service.js.map