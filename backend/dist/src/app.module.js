"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const rfid_module_1 = require("./rfid/rfid.module");
const environments_module_1 = require("./environments/environments.module");
const caronte_module_1 = require("./caronte/caronte.module");
const log_module_1 = require("./log/log.module");
const cors = require("cors");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(cors()).forRoutes('*');
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            rfid_module_1.RfidModule,
            environments_module_1.EnvironmentsModule,
            caronte_module_1.CaronteModule,
            log_module_1.LogModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map