import { Args, Query, Resolver } from '@nestjs/graphql';

import {
  StoreLocation,
  StoreSearchLocationInput,
} from '../../../shared/dto/store.dto';
import { GameStopService } from '../services/game-stop.service';

@Resolver()
export class GameStopResolver {
  constructor(private readonly gameStopService: GameStopService) {}

  @Query(() => String)
  public gameStopGreeting(): string {
    return this.gameStopService.greeting();
  }

  @Query(() => [StoreLocation])
  public async getLocalGameStopStores(
    @Args('address') address: StoreSearchLocationInput,
  ): Promise<StoreLocation[]> {
    console.log(address);

    return this.gameStopService.allNearbyLocations(address);
  }
}
