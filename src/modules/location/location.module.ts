import { HttpModule, Module } from '@nestjs/common';
import * as config from 'config';

import { LocationService } from './services/location.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async () => {
        const googleMapsBaseApiUrl = config.get<string>('google.BASE_API_URL');
        const googleMapsApiKey = config.get<string>('google.MAPS_API_KEY');

        return {
          baseURL: googleMapsBaseApiUrl,
          params: {
            key: googleMapsApiKey,
          },
        };
      },
    }),
  ],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
