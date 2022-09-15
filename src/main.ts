import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Context, Handler } from 'aws-lambda';
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
const binaryMimeTypes: string[] = [];
import express from 'express';
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
    nestApp.useStaticAssets(resolve('./src/public'));
    nestApp.setBaseViewsDir(resolve('./src/views'));
    nestApp.setViewEngine('hbs');
    await nestApp.init();
    await nestApp.listen(3000);
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.path === '/api-docs') event.path = '/api-docs/';

  event.path = event.path.includes('swagger-ui')
    ? `/api-docs${event.path}`
    : event.path;
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
