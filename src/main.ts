import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { Context, Handler } from 'aws-lambda';
import { Server } from 'http';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { ValidationPipe } from '@nestjs/common';
import { BaseAPIDocumentation } from './api/base.document';
import { join } from 'path';
import express from 'express';
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    const documentOptions = new BaseAPIDocumentation().initializeOptions();
    const document = SwaggerModule.createDocument(nestApp, documentOptions);
    SwaggerModule.setup('api/v1/docs', nestApp, document);
    nestApp.useStaticAssets(join(__dirname, '..', 'public'));
    nestApp.setBaseViewsDir(join(__dirname, '..', 'views'));
    nestApp.setViewEngine('hbs');
    nestApp.use(eventContext());
    nestApp.useGlobalPipes(new ValidationPipe({ transform: true }));
    await nestApp.init();
    await nestApp.listen(3000);
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
