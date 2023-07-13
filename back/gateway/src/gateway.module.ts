import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MicroserviceExceptionInterceptor } from './microservice-exception.interceptor';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
=======
import { AuthModule } from './modules/auth/auth.module';
>>>>>>> 2888b680268ccde2d82ccf6a6f3a00509932e023

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
