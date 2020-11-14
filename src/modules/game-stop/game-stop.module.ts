import { Module } from '@nestjs/common';

import { GameStopResolver } from './resolvers/game-stop.resolver';
import { GameStopService } from './services/game-stop.service';
import { GameStopController } from './controllers/game-stop.controller';

@Module({
  providers: [GameStopResolver, GameStopService],
  controllers: [GameStopController],
})
export class GameStopModule {}
