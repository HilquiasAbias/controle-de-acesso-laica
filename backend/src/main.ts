import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*'
  });

  const config = new DocumentBuilder()
    .setTitle('Laica: controle de acesso')
    .setDescription('API de logs para microcontroladores')
    .setVersion('1.1')
    .addBearerAuth()
    .addSecurity('', {
      scheme: 'basicAuth',
      type: 'http'
    })
    .build();

  app.setGlobalPrefix('access-ng');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
