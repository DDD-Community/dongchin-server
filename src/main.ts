import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import { Server } from 'http';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerSetup } from './util/swagger';
import { resolve } from 'path';
import express from 'express';
import { HttpExceptionFilter } from './util/http-exception.filter';

const binaryMimeTypes: string[] = [];
let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    nestApp.use(eventContext());
    nestApp.useGlobalPipes(new ValidationPipe({ transform: true }));
    SwaggerSetup(nestApp);
    nestApp.setBaseViewsDir(resolve('./src/views'));
    nestApp.setViewEngine('hbs');
    nestApp.useGlobalFilters(new HttpExceptionFilter());
    await nestApp.init();
    await nestApp.listen(3000);
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (event.path === '/api-docs') event.path = '/api-docs/';

  event.path = event.path.includes('swagger-ui')
    ? `/api-docs${event.path}`
    : event.path;

  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};

if (!process.env.NODE_ENV) bootstrapServer();
