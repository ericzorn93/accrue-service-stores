import { StoreSearchLocationInput } from 'src/shared/dto';
import { HttpService, Injectable } from '@nestjs/common';
import { LocationCoords } from '../dto/location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly httpService: HttpService) {}

  public async getCoords(
    address: StoreSearchLocationInput,
  ): Promise<LocationCoords> {
    let parsedAddress = Object.keys(address).reduce((acc, key) => {
      acc += `${key}=${address[key]}+`;
      return acc;
    }, '');

    // Trim the ending of the address
    if (parsedAddress[parsedAddress.length - 1] === '+') {
      parsedAddress = parsedAddress.slice(0, parsedAddress.length - 2);
    }

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
