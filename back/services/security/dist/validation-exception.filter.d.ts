import { ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Observable } from 'rxjs';
export declare class ValidationExceptionFilter extends BaseRpcExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): Observable<any>;
}
