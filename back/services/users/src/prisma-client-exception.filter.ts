import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { Observable, throwError } from 'rxjs';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': {
        const errorMessage = message.match(/`([^`]+)`\)$/);
        const errorField = errorMessage ? errorMessage[1] : 'Unknown field';
        const thisMessage = `Unique constraint failed on the field: (${errorField})`;
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: thisMessage,
          error: 'Conflict',
        });
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