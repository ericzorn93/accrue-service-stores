import {
  BadRequestException,
  HttpService,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {
  GameStopStoreLocation,
  GameStopStoreLocationResponse,
  StoreSearchLocationInput,
} from 'src/shared/dto';
import { LocationService } from 'src/modules/location/services/location.service';

@Injectable()
export class GameStopService {
  private readonly logger = new Logger('GameStop Service');

  constructor(
    private readonly httpService: HttpService,
    private readonly locationService: LocationService,
  ) {}

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
  public async allNearbyLocations(
    address: StoreSearchLocationInput,
  ): Promise<GameStopStoreLocationResponse> {
    let userLat: string;
    let userLng: string;

    // Finds user's coordinates from Google Maps
    try {
      const { lat, lng } = await this.locationService.getCoords(address);
      userLat = lat;
      userLng = lng;
    } catch (err) {
      this.logger.error(
        `Could not find location coords for ${address.houseNumber} ${address.city}, ${address.state}`,
      );

      throw new BadRequestException(
        'Please provide a valid US address for aquiring cooridantes',
      );
    }

    // Call Store Locator API GameStop with 30 mile radius
    let gameStopLocations: GameStopStoreLocation[] = [];
    try {
      const { data } = await this.httpService
        .get('/Stores-FindStores', {
          params: { lat: userLat, long: userLng, radius: 30 },
        })
        .toPromise();

      const { stores } = data;

      gameStopLocations = stores;
    } catch (err) {
      this.logger.error(
        `Could not contact GameStop API for locator with coords=${userLat},${userLng}`,
      );
      throw new NotFoundException(
        'Could not contact GameStop API for store locator',
      );
    }

    return {
      userCoords: {
        lat: userLat,
        lng: userLng,
      },
      locations: gameStopLocations,
    };
  }
}
