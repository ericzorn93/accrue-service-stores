import { HttpModule, Module } from '@nestjs/common';
import * as config from 'config';

import { GameStopResolver } from './resolvers/game-stop.resolver';
import { GameStopService } from './services/game-stop.service';
import { GameStopController } from './controllers/game-stop.controller';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => {
        const gamestopBaseApiUrl = config.get<string>('gameStop.BASE_API_URL');

        return {
          baseURL: gamestopBaseApiUrl,
        };
      },
    }),
    LocationModule,
  ],
  providers: [GameStopResolver, GameStopService],
  controllers: [GameStopController],
})
export class GameStopModule {}
