import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LogModule } from './log/log.module';
import * as cors from 'cors';

@Module({
  imports: [LogModule],
})
export class AppModule {}
