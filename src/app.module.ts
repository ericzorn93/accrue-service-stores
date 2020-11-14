import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameStopModule } from './modules/game-stop/game-stop.module';
import { IGQLContext } from './types/gqlContext.d';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: './accrueServiceStores.graphql',
      context: ({ req, res }): IGQLContext => ({
        req,
        res,
        appName: 'accure-service-stores',
      }),
    }),
    GameStopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
