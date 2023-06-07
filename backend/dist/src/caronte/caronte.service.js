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
    async findUserByTag(tag, envId) {
        const environment = await this.prisma.environment.findUnique({
            where: {
                id: envId
            },
            include: {
                admins: {
                    where: {
                        rfid: {
                            tag: tag
                        }
                    },
                    take: 1
                },
                frequenters: {
                    where: {
                        rfid: {
                            tag: tag
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
                        mac
                    },
                    take: 1
                },
                frequenters: {
                    where: {
                        mac
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
                accessTimes: true
            },
        });
        if (user.accessTimes) {
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
            throw new BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`);
        }
        const caronte = await this.prisma.caronte.findFirst({
            where: {
                esp: obolForCharon.esp
            }
        });
        if (!caronte) {
            throw new UnauthorizedException('Unauthorized caronte access');
        }
        const isCarontePasswordValid = await bcrypt.compare(obolForCharon.carontePassword, caronte.password);
        if (!isCarontePasswordValid) {
            throw new UnauthorizedException('Unauthorized caronte access');
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
            throw new UnauthorizedException('Unauthorized user access');
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
};
exports.CaronteService = CaronteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CaronteService);
//# sourceMappingURL=caronte.service.js.map