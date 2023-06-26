import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { PrismaClientExceptionFilter } from "./prisma-client-exception.filter";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: 6001
    }
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.listen();
}
bootstrap();