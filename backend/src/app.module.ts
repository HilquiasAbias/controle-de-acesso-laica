import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { EnvironmentsModule } from './environments/environments.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MacModule } from './mac/mac.module';
import { CaronteModule } from './caronte/caronte.module';
import * as cors from 'cors';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    EnvironmentsModule, 
    AuthModule, 
    TagsModule, 
    MacModule, CaronteModule,
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
