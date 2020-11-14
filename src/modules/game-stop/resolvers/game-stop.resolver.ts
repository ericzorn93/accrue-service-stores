import { Args, Query, Resolver } from '@nestjs/graphql';

import {
  StoreLocation,
  StoreSearchLocationInput,
} from '../../../shared/dto/store.dto';

@Resolver()
export class GameStopResolver {
  @Query(() => String)
  public gameStopGreeting(): string {
    return 'Welcome to the gamestop resolver';
  }

  @Query(() => [StoreLocation])
  public async getLocalGameStopStores(
    @Args('address') location: StoreSearchLocationInput,
  ): Promise<StoreLocation[]> {
    console.log(location);

    return [
      {
        storeName: 'Testing Store',
        streetAddress: '123 main street',
      },
    ];
  }
}
