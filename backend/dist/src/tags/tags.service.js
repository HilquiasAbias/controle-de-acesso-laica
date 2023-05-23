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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TagsService = class TagsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTagDto) {
        const user = await this.prisma.user.findFirstOrThrow({
            where: { id: createTagDto.userId },
            include: { tag: true }
        });
        if (user.tag) {
            throw new common_1.HttpException('User already has a tag', common_1.HttpStatus.FORBIDDEN);
        }
        let tag;
        try {
            tag = await this.prisma.tag.create({
                data: {
                    content: createTagDto.content,
                    User: { connect: { id: createTagDto.userId } }
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException("tag alredy exists.", common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException("Can't create tag.", common_1.HttpStatus.FORBIDDEN);
            }
        }
        return tag;
    }
    async findAll() {
        try {
            return await this.prisma.tag.findMany();
        }
        catch (error) {
            throw new Error();
        }
    }
    async findAllTagsByEnvironment(body) {
        const env = await this.prisma.environment.findFirst({
            where: { id: body.envId },
            include: {
                admins: { include: { tag: true } },
                frequenters: { include: { tag: true } }
            }
        });
        if (!env) {
            throw new common_1.HttpException("Environment not found", common_1.HttpStatus.NOT_FOUND);
        }
        const tags = [];
        env.admins.forEach(admin => {
            if (admin.tag)
                tags.push(admin.tag);
        });
        env.frequenters.forEach(frequenter => {
            if (frequenter.tag)
                tags.push(frequenter.tag);
        });
        try {
            return tags;
        }
        catch (error) {
            throw new Error();
        }
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('Invalid Input. ID must be sent.');
        }
        return await this.prisma.tag.findUnique({
            where: { id }
        });
    }
    async update(id, updateTagDto, requestUser) {
        const validFields = ['content', 'userId'];
        const invalidFields = Object.keys(updateTagDto).filter(field => !validFields.includes(field));
        if (invalidFields.length > 0) {
            throw new common_1.BadRequestException(`Invalid fields provided: ${invalidFields.join(', ')}`);
        }
        const tag = await this.prisma.tag.findFirst({
            where: { id },
            include: { User: true }
        });
        if (requestUser.id !== tag.User.id && tag.User.role === 'ADMIN') {
            throw new common_1.HttpException("An admin cannot update another admin's tag", common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            return await this.prisma.tag.update({
                where: { id },
                data: updateTagDto
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.HttpException("Tag not found", common_1.HttpStatus.NOT_FOUND);
            }
            else if (error.code === 'P2002') {
                throw new common_1.HttpException("This tag already exists", common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException("Can't update tag.", common_1.HttpStatus.FORBIDDEN);
            }
        }
    }
    async remove(id) {
        if (isNaN(id)) {
            throw new common_1.HttpException("Id must be a number", common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.tag.delete({
            where: { id }
        });
    }
};
TagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TagsService);
exports.TagsService = TagsService;
//# sourceMappingURL=tags.service.js.map