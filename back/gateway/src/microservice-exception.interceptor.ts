import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MicroserviceExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        // Aqui você pode personalizar o tratamento da exceção e retornar uma resposta adequada
        console.log(error);
        //console.log(error.response);
        
        if (error.statusCode === 409) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
        
        if (error.response.statusCode === 400) {
          throw new HttpException(error.response.message, HttpStatus.BAD_REQUEST);
        }

        if (error.statusCode === 403) {
          throw new HttpException(error.message, HttpStatus.FORBIDDEN);
        }
        
        throw new BadGatewayException('Erro ao processar a requisição via microsserviço');
      }),
    );
  }
}