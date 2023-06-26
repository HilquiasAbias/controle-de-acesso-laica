import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MicroserviceExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        // Aqui você pode personalizar o tratamento da exceção e retornar uma resposta adequada
        console.log(error);
        
        if (error.statusCode === 409) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
        
        throw new BadGatewayException('Erro ao processar a requisição via microsserviço');
      }),
    );
  }
}