import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 세팅파일
 *
 * @param {INestApplication} app
 */
export function SwaggerSetup(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Dongchin API Docs')
    .setDescription('Linco API 문서')
    .setVersion('1.0.0')
    .addServer('/dev')
    .addServer('')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
