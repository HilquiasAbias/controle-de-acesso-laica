import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
export declare class MicroserviceExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
