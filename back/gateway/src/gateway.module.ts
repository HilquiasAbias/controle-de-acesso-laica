import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MicroserviceExceptionInterceptor } from './microservice-exception.interceptor';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MicroserviceExceptionInterceptor,
    }
  ]
})
export class GatewayModule {}
