import { HttpModule, Module } from '@nestjs/common';
import * as config from 'config';

import { LocationService } from './services/location.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async () => {
        const googleMapsApiKey = config.get<string>('google.MAPS_API_KEY');

        return {
          baseURL: 'https://maps.googleapis.com/maps/api',
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
