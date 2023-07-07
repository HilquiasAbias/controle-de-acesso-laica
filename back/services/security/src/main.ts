import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ValidationExceptionFilter } from "./validation-exception.filter";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: 6002
    }
  });
  
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.listen();
}
bootstrap();