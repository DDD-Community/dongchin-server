import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { env } from 'process';
import { BaseAPIDocumentation } from './api/base.document';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* mount Swagger API Documentation */
  const documentOptions = new BaseAPIDocumentation().initializeOptions();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('api/v1/docs', app, document);
  await app.listen(3000);
}
bootstrap();
