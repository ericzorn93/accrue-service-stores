import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { __dev__ } from './utils/isDev.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Register Middleware For Development
  if (!__dev__) {
    app.use(helmet());
  }

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  Logger.debug(`Accrue Service Stores listening on port ${PORT}`);
}
bootstrap();
