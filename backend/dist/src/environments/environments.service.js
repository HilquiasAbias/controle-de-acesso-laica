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
exports.EnvironmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EnvironmentsService = class EnvironmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEnvironmentDto) {
        const env = await this.prisma.environment.create({
            data: {
                name: createEnvironmentDto.name,
                description: createEnvironmentDto.description,
                admins: createEnvironmentDto.adminId ? { connect: { id: createEnvironmentDto.adminId } } : undefined
            }
        });
        return env;
    }
    async createAndAddUser(data, envId) {
        const user = await this.prisma.user.create({
            data
        });
    }
    async findAll() {
        return await this.prisma.environment.findMany({
            include: {
                admins: true,
                frequenters: true,
                triggers: true
            }
        });
    }
    async findOne(id) {
        return await this.prisma.environment.findFirst({
            where: { id },
            include: {
                admins: true,
                frequenters: true,
                triggers: true
            }
        });
    }
    async update(id, updateEnvironmentDto) {
        return await this.prisma.environment.update({
            data: updateEnvironmentDto,
            where: { id }
        });
    }
    async remove(id) {
        return await this.prisma.environment.delete({
            where: { id }
        });
        ;
    }
};
EnvironmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnvironmentsService);
exports.EnvironmentsService = EnvironmentsService;
//# sourceMappingURL=environments.service.js.map