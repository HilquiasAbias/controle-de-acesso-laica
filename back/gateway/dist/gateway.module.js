"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./modules/users/users.module");
const core_1 = require("@nestjs/core");
const microservice_exception_interceptor_1 = require("./microservice-exception.interceptor");
<<<<<<< HEAD
const auth_module_1 = require("./auth/auth.module");
=======
const auth_module_1 = require("./modules/auth/auth.module");
>>>>>>> 2888b680268ccde2d82ccf6a6f3a00509932e023
let GatewayModule = class GatewayModule {
};
GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: microservice_exception_interceptor_1.MicroserviceExceptionInterceptor,
            }
        ]
    })
], GatewayModule);
exports.GatewayModule = GatewayModule;
//# sourceMappingURL=gateway.module.js.map