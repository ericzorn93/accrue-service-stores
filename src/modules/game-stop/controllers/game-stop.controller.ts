import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  GameStopProductAvailableResponse,
  GameStopStoreLocation,
  GameStopStoreLocationResponse,
  StoreSearchLocationInput,
} from 'src/shared/dto';
import { GameStopService } from '../services/game-stop.service';

@ApiTags('/game-stop')
@Controller('game-stop')
export class GameStopController {
  constructor(private readonly gameStopService: GameStopService) {}

  @Get('/')
  @ApiOkResponse({ type: String })
  public gamestopGreeting(): string {
    return this.gameStopService.greeting();
  }

  @Post('/nearby-locations')
  @ApiOkResponse({
    type: [GameStopStoreLocation],
    description: 'All GameStop stores nearby to provided location',
  })
  public async getLocalGameStopStores(
    @Body() address: StoreSearchLocationInput,
  ): Promise<GameStopStoreLocationResponse> {
    const locationResponse = await this.gameStopService.allNearbyLocations(
      address,
    );

    return locationResponse;
  }

  @Post('/product-inventory')
  @ApiOkResponse({ type: [GameStopProductAvailableResponse] })
  public async getGameStopProductInventory(
    @Body('address') address: StoreSearchLocationInput,
    @Body('productId') productId: string,
  ): Promise<GameStopProductAvailableResponse[]> {
    const storesContainingAvailableProduct = await this.gameStopService.getProductInventory(
      address,
      productId,
    );

    return storesContainingAvailableProduct;
  }
}
