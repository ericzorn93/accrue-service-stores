import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { __dev__ } from './utils/isDev.util';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Register Middleware For Development
  if (!__dev__) {
    app.use(helmet());
  }

  // Open API/Swagger
  const options = new DocumentBuilder()
    .setTitle('Accrue Stores')
    .setDescription(
      'An API to find inventory of your desired items at your favorite stores',
    )
    .setVersion('1.0')
    .addTag('accureStores')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Start Server
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  Logger.debug(`Accrue Service Stores listening on port ${PORT}`);
}
bootstrap();
