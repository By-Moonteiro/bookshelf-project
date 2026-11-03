import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { StandardSchemaValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module.js';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = app.get(ConfigService);
  const port = config.getOrThrow<number>('PORT');

  app.enableCors({
    origin: config.getOrThrow<string>('CORS_ORIGIN'),
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  });

  app.useGlobalPipes(new StandardSchemaValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bookshelf API')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  app.use(
    '/docs',
    apiReference({
      withFastify: true,
      content: document,
      theme: 'deepSpace',
    }),
  );

  await app.listen(port, '0.0.0.0');
}

await bootstrap();
