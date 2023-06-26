import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { UserModule } from "./user/user.module";
import { ValidationPipe } from "@nestjs/common";
import { PrismaClientExceptionFilter } from "./prisma-client-exception.filter";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: 6001
    }
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.listen();
}
bootstrap();