"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentsModule = void 0;
const common_1 = require("@nestjs/common");
const environments_service_1 = require("./environments.service");
const environments_controller_1 = require("./environments.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let EnvironmentsModule = class EnvironmentsModule {
};
EnvironmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [environments_controller_1.EnvironmentsController],
        providers: [environments_service_1.EnvironmentsService]
    })
], EnvironmentsModule);
exports.EnvironmentsModule = EnvironmentsModule;
//# sourceMappingURL=environments.module.js.map