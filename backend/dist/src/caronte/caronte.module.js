"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaronteModule = void 0;
const common_1 = require("@nestjs/common");
const caronte_service_1 = require("./caronte.service");
const caronte_controller_1 = require("./caronte.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const environments_module_1 = require("../environments/environments.module");
let CaronteModule = class CaronteModule {
};
CaronteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            environments_module_1.EnvironmentsModule,
        ],
        controllers: [caronte_controller_1.CaronteController],
        providers: [caronte_service_1.CaronteService]
    })
], CaronteModule);
exports.CaronteModule = CaronteModule;
//# sourceMappingURL=caronte.module.js.map