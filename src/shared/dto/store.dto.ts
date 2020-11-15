import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, Length } from 'class-validator';

import { LocationCoords } from './../../modules/location/dto/location.dto';

/**************
 * MAIN STORE *
 **************/
@ObjectType({ description: 'Main Store Input Type' })
export class GameStopStoreLocation {
  @ApiProperty()
  @Field(() => String)
  'ID': string;

  @ApiProperty()
  @Field(() => String)
  'name': string;

  @ApiProperty()
  @Field(() => String)
  'address1': string;

  @ApiProperty()
  @Field(() => String)
  'address2': string;

  @ApiProperty()
  @Field(() => String)
  'city': string;

  @ApiProperty()
  @Field(() => String)
  'postalCode': string;

  @ApiProperty()
  @Field(() => Float)
  'latitude': number;

  @ApiProperty()
  @Field(() => Float)
  'longitude': number;

  @ApiProperty()
  @Field(() => String)
  'phone': string;

  @ApiProperty()
  @Field(() => String)
  'stateCode': string;

  @ApiProperty()
  @Field(() => String)
  'countryCode': string;

  @ApiProperty()
  @Field(() => String)
  'storeHours': string;

  @ApiProperty()
  @Field(() => String)
  'image': string;

  @ApiProperty()
  @Field(() => String)
  'storeOperationHours': string;

  @ApiProperty()
  @Field(() => String)
  'storeBrand': any;

  @ApiProperty()
  @Field(() => String)
  'storeMode': string;

  @ApiProperty()
  @Field(() => String)
  'brandIcon': string;

  @ApiProperty()
  @Field(() => String)
  'isPreferredStore': true;
}

/*******************************
 * STORE LOCATION SEARCH INPUT *
 *******************************/
@InputType({ description: 'Input Location Type to Search for Stores' })
export class StoreSearchLocationInput {
  @ApiProperty()
  @IsNumber()
  @Field(() => Int)
  houseNumber: number;

  @ApiProperty()
  @IsString()
  @Field(() => String)
  streetName: string;

  @ApiProperty()
  @IsString()
  @Field(() => String)
  city: string;

  @ApiProperty()
  @IsString()
  @Length(2, 2)
  @Transform((country: string) => country.toLowerCase())
  @Field(() => String)
  state: string;

  @ApiProperty()
  @IsString()
  @Length(5, 5)
  @Field(() => String)
  zipCode: string;

  @ApiProperty()
  @IsString()
  @Length(2, 2)
  @Transform((country: string) => country.toLowerCase())
  @Field(() => String)
  country: string;
}

/***************************
 * STORE LOCATION RESPONSE *
 ***************************/
@ObjectType({
  description: 'Store Location Response with User Coords from GameStop',
})
export class GameStopStoreLocationResponse {
  @ApiProperty()
  @Field(() => LocationCoords)
  userCoords: LocationCoords;

  @ApiProperty()
  @Field(() => [GameStopStoreLocation])
  locations: GameStopStoreLocation[];
}
