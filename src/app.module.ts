import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameStopModule } from './modules/game-stop/game-stop.module';
import { IAccrueStoresGQLContext } from './shared/types/accrueStoresGqlContext';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: './accrueServiceStores.graphql',
      context: ({ req, res }): IAccrueStoresGQLContext => ({
        req,
        res,
        appName: 'accure-service-stores',
      }),
    }),
    GameStopModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
