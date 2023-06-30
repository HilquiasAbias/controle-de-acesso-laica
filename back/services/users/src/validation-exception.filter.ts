import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { ValidationError } from 'class-validator';
import { Observable, throwError } from 'rxjs';

@Catch()
export class ValidationExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): Observable<any> {
    if (exception instanceof Array && exception.every(item => item instanceof ValidationError)) {
      const errors = exception.map((error: ValidationError) => {
        const { constraints } = error;
        const property = Object.keys(constraints)[0];
        const message = constraints[property];
        return {
          property,
          message,
        };
      });

      return throwError(new RpcException({
        statusCode: 400,
        message: 'Validation failed',
        error: 'Bad Request',
        errors,
      }));
    }

    return super.catch(exception, host); // fallback to default behavior
  }
}