import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RfidModule } from './rfid/rfid.module';
import { EnvironmentsModule } from './environments/environments.module';
import { CaronteModule } from './caronte/caronte.module';
import { LogModule } from './log/log.module';
import * as cors from 'cors';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    AuthModule, 
    RfidModule, 
    EnvironmentsModule, 
    CaronteModule, LogModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
