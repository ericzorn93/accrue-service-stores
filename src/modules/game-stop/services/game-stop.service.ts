import { Injectable } from '@nestjs/common';

import { StoreLocation, StoreSearchLocationInput } from 'src/shared/dto';

@Injectable()
export class GameStopService {
  /**
   * Regular greeting to any gamestop
   * controllers or resolvers.
   *
   * @return {*}  {string}
   * @memberof GameStopService
   */
  public greeting(): string {
    return 'Welcome to the GameStop Service';
  }

  /**
   * Accepts a user's address and will query
   * the existing GameStop API for all nearby locations.
   *
   * @param {StoreSearchLocationInput} address
   * @return {*}  {StoreLocation[]}
   * @memberof GameStopService
   */
  public allNearbyLocations(
    address: StoreSearchLocationInput,
  ): StoreLocation[] {
    console.log(address);

    return [
      {
        storeName: 'Testing Store',
        streetAddress: '123 main street',
      },
    ];
  }
}
