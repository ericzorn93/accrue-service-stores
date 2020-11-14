import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Register Middleware
  app.use(helmet());

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  Logger.debug(`Accrue Service Stores listening on port ${PORT}`);
}
bootstrap();
