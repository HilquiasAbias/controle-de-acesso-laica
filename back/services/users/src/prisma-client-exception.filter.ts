import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { Observable, throwError } from 'rxjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): Observable<any> {
    console.error(exception.message);

    switch (exception.code) {
      case 'P2002': {
        const errorMessage = exception.message.replace(/\n/g, '');
        const errorField = errorMessage.match(/`([^`]+)`\)$/)[1];
        return throwError(new RpcException({
          statusCode: 409,
          message: `Unique constraint failed on the field: (${errorField})`,
          error: 'Conflict',
        }));
      }

      case 'P2025': {
        const errorMessage = exception.message.replace(/\n/g, '');
        const match = errorMessage.match(/The (\w+) with value \(.+\) was not found in/);
        const entityName = match ? match[1] : null;
        return throwError(new RpcException({
          statusCode: 404,
          message: entityName ? `The requested ${entityName} was not found.` : errorMessage,
          error: 'Not found',
        }));
      }

      // Handle other Prisma errors...

      default:
        return super.catch(exception, host); // default behavior
    }
  }
}