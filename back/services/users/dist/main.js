"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const prisma_client_exception_filter_1 = require("./prisma-client-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: "127.0.0.1",
            port: 6001
        }
    });
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new prisma_client_exception_filter_1.PrismaClientExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map