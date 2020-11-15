import { Args, Query, Resolver } from '@nestjs/graphql';

import {
  GameStopStoreLocationResponse,
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

  @Query(() => GameStopStoreLocationResponse)
  public async getLocalGameStopStores(
    @Args('address') address: StoreSearchLocationInput,
  ): Promise<GameStopStoreLocationResponse> {
    const locationResponse = await this.gameStopService.allNearbyLocations(
      address,
    );

    return locationResponse;
  }
}
