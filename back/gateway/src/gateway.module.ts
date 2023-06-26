import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MicroserviceExceptionInterceptor } from './microservice-exception.interceptor';
import { MicroserviceExceptionFilter } from './microservice-exception.filter';

@Module({
  imports: [
    UsersModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MicroserviceExceptionInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: MicroserviceExceptionFilter,
    // },
  ],
})
export class GatewayModule {}
