import { Args, Query, Resolver } from '@nestjs/graphql';

import {
  GameStopProductAvailableResponse,
  GameStopStoreLocationResponse,
  StoreSearchLocationInput,
} from '../../../shared/dto/store.dto';
import { GameStopService } from '../services/game-stop.service';

@Resolver()
export class GameStopResolver {
  constructor(private readonly gameStopService: GameStopService) {}

  @Query(() => String, { description: 'Standard GameStop Greeting' })
  public gameStopGreeting(): string {
    return this.gameStopService.greeting();
  }

  @Query(() => GameStopStoreLocationResponse, {
    description:
      'GameStop locations from the GameStop API, based on the current user location.',
  })
  public async getLocalGameStopStores(
    @Args('address') address: StoreSearchLocationInput,
  ): Promise<GameStopStoreLocationResponse> {
    const locationResponse = await this.gameStopService.allNearbyLocations(
      address,
    );

    return locationResponse;
  }

  @Query(() => [GameStopProductAvailableResponse], {
    description:
      'GameStop locations from the GameStop API, based on the current user location.',
  })
  public async getGameStopProductInventory(
    @Args('address') address: StoreSearchLocationInput,
    @Args('productId') productId: string,
  ): Promise<GameStopProductAvailableResponse[]> {
    const storesContainingAvailableProduct = await this.gameStopService.getProductInventory(
      address,
      productId,
    );

    return storesContainingAvailableProduct;
  }
}
