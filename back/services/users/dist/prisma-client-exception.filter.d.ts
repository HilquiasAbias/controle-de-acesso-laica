import { ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { Observable } from 'rxjs';
export declare class PrismaClientExceptionFilter extends BaseRpcExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): Observable<any>;
}
