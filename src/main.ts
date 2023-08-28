import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS
  app.use(express.static('.')); // relocate path to load public data

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Node 32 Pinterest')
    .setDescription('A Pinterest Clone API')
    .addBearerAuth
    // { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
    // 'access-token',
    ()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(8080);
}
bootstrap();
