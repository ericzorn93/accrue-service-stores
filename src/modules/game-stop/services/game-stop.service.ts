import {
  BadRequestException,
  HttpService,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {
  GameStopProductAvailableResponse,
  GameStopProductInventory,
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

    // Call Store Locator API GameStop with 15 mile radius
    let gameStopLocations: GameStopStoreLocation[] = [];
    try {
      const { data } = await this.httpService
        .get('/Stores-FindStores', {
          params: { lat: userLat, long: userLng, radius: 15 },
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

  /**
   * Gets the product inventory from a product ID and a provided user's
   * address
   *
   * @param {StoreSearchLocationInput} address
   * @param {string} productId
   * @memberof GameStopService
   */
  public async getProductInventory(
    address: StoreSearchLocationInput,
    productId?: string,
  ): Promise<GameStopProductAvailableResponse[]> {
    let storeIds: string[] = [];
    try {
      const stores = await this.allNearbyLocations(address);
      const { locations } = stores;
      storeIds = locations.map(location => location.ID);
    } catch (err) {
      this.logger.error('Cannot find nearby locations to query for product');
      throw new InternalServerErrorException(
        'Cannot find locations from the provided address',
      );
    }

    let productInventory: GameStopProductInventory[] = [];
    try {
      const inventoryRequests = storeIds.map(id =>
        this.httpService
          .get(
            `/Stores-ProductDetailStoreAvailability?pid=${productId}&redesignFlag=true&storeId=${id}`,
          )
          .toPromise(),
      );
      const inventoryResponses = await Promise.all(inventoryRequests);
      productInventory = inventoryResponses.map(
        inventoryResponse => inventoryResponse.data,
      );
    } catch (err) {
      this.logger.error(
        `Cannot find GameStop product inventory with in the provided radius of zipcode ${address.zipCode}`,
      );
    }

    // Filter the inventory that is available
    const availableStores = productInventory.filter(store => {
      const {
        storePickupDetails,
        hasVariantsAvailableForPickup,
        hasVariantsAvailableForPickupInStock,
        products,
      } = store;

      if (
        storePickupDetails ||
        hasVariantsAvailableForPickup ||
        hasVariantsAvailableForPickupInStock
      ) {
        return true;
      }

      const availableProduct = (products ?? []).find(
        product => product.inStock && product.inStockCount >= 1,
      );

      if (availableProduct) {
        return true;
      }

      return false;
    });

    // Format for response
    const filteredAvailableStores = availableStores.map(store => ({
      isAvailable: true,
      storeId: store.storeId,
      storeDetails: store.storeDetails,
      productId,
      isAvailableForPickup:
        (store.hasVariantsAvailableForPickup ||
          store.hasVariantsAvailableForPickupInStock) ??
        false,
      fetchedOn: new Date().toISOString(),
    }));

    this.logger.debug(
      `Found ${filteredAvailableStores.length} that contain active inventory for ${productId} near ${address.zipCode}`,
    );
    return filteredAvailableStores;
  }
}
