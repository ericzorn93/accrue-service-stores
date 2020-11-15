import { HttpModule, Module } from '@nestjs/common';

import { GameStopResolver } from './resolvers/game-stop.resolver';
import { GameStopService } from './services/game-stop.service';
import { GameStopController } from './controllers/game-stop.controller';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL:
        'https://www.gamestop.com/on/demandware.store/Sites-gamestop-us-Site/default',
    }),
    LocationModule,
  ],
  providers: [GameStopResolver, GameStopService],
  controllers: [GameStopController],
})
export class GameStopModule {}
