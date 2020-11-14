import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { StoreLocation, StoreSearchLocationInput } from 'src/shared/dto';
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
    type: [StoreLocation],
    description: 'All GameStop stores nearby to provided location',
  })
  public async getLocalGameStopStores(
    @Body() address: StoreSearchLocationInput,
  ): Promise<StoreLocation[]> {
    return this.gameStopService.allNearbyLocations(address);
  }
}
