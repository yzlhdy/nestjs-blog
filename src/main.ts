import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express'
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json())
  app.use(express.urlencoded({
    extended: true
  }))
  // 监听所有的请求路由，并打印日志
  app.use(logger)
  // 使用拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor())
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix("api")
  await app.listen(3000);
}
bootstrap();
