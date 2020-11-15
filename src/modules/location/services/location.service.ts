import { StoreSearchLocationInput } from 'src/shared/dto';
import { HttpService, Injectable, Logger } from '@nestjs/common';
import { LocationCoords } from '../dto/location.dto';

@Injectable()
export class LocationService {
  private readonly logger = new Logger('Location Service');

  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtain the user's coordinates from the provided address and query the
   * Google Maps API
   *
   * @param {StoreSearchLocationInput} address
   * @return {*}  {Promise<LocationCoords>}
   * @memberof LocationService
   */
  public async getCoords(
    address: StoreSearchLocationInput,
  ): Promise<LocationCoords> {
    let parsedAddress = Object.keys(address).reduce((acc, key) => {
      acc += `${address[key]}+`;
      return acc;
    }, '');

    // Trim the ending of the address
    if (parsedAddress[parsedAddress.length - 1] === '+') {
      parsedAddress = parsedAddress.slice(0, parsedAddress.length - 1);
    }

    this.logger.debug(
      `Finding GameStop locations for address ${JSON.stringify(address)}`,
    );

    const { data } = await this.httpService
      .get('/geocode/json', {
        params: {
          address: parsedAddress,
        },
      })
      .toPromise();

    // Pull out North East Bounds
    const { results } = data;
    const [firstAddressResult] = results;
    const { geometry } = firstAddressResult;
    const {
      bounds: { northeast },
    } = geometry;

    const { lat, lng } = northeast;

    return {
      lat,
      lng,
    };
  }
}
