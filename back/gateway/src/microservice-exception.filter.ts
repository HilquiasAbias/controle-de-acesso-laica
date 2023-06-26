import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class MicroserviceExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    // Aqui você pode personalizar o tratamento da exceção e retornar uma resposta adequada
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}