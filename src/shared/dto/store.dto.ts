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

/********************************
 * NEAREST GAMESTOP STORE DETAILS *
 ********************************/
@ObjectType({ description: 'Nearest GameStop Store Details' })
export class NearestGameStopStoreDetails {
  @ApiProperty()
  @Field(() => String)
  InStorePickUpMessageNextDay: string;

  @ApiProperty()
  @Field(() => Boolean)
  address1: string;

  @ApiProperty()
  @Field(() => String, { nullable: true })
  address2: string;

  @ApiProperty()
  @Field(() => Int)
  inventoryAvailable: number;

  @ApiProperty()
  @Field(() => Boolean)
  limitedStockMessage: string;

  @ApiProperty()
  @Field(() => Boolean)
  nearestStoreId: string;

  @ApiProperty()
  @Field(() => Boolean)
  nearestStoreText: string;

  @ApiProperty()
  @Field(() => Boolean)
  postalCode: string;

  @ApiProperty()
  @Field(() => Boolean)
  sku: string;

  @ApiProperty()
  @Field(() => Boolean)
  stateCode: string;

  @ApiProperty()
  @Field(() => Boolean)
  storeHours: string;

  @ApiProperty()
  @Field(() => Boolean)
  storeOperationHours: string;
}

/********************
 * GAMESTOP PRODUCT *
 ********************/
@ObjectType({
  description: 'GameStop Product',
})
export class GameStopProduct {
  @ApiProperty()
  @Field(() => Boolean)
  allowBOPS: true;

  @ApiProperty()
  @Field(() => Boolean)
  allowHOPS: false;

  @ApiProperty()
  @Field(() => Boolean)
  allowStoreLookup: true;

  @ApiProperty()
  @Field(() => Boolean)
  enablePickupBOPS: true;

  @ApiProperty()
  @Field(() => Boolean)
  enablePickupCheckout: true;

  @ApiProperty()
  @Field(() => Boolean)
  enablePickupPDP: true;

  @ApiProperty()
  @Field(() => Boolean)
  enablePickupTile: true;

  @ApiProperty()
  @Field(() => String)
  id: string;

  @ApiProperty()
  @Field(() => Boolean)
  inStock: boolean;

  @ApiProperty()
  @Field(() => Int)
  inStockCount: number;

  @ApiProperty()
  @Field(() => Boolean)
  isBOPSPreOrder: false;

  @ApiProperty()
  @Field(() => Boolean)
  isISPU: false;

  @ApiProperty()
  @Field(() => NearestGameStopStoreDetails)
  nearestStoreDetailsObj: NearestGameStopStoreDetails;

  @ApiProperty()
  @Field(() => Boolean)
  onlyBOPS: true;

  @ApiProperty()
  @Field(() => Boolean)
  onlyHOPS: false;

  @ApiProperty()
  @Field(() => Boolean)
  onlyISPU: false;

  @ApiProperty()
  @Field(() => Boolean)
  showPdpStoreLocatorIcon: true;

  variationAttributes: { condition: 'Pre-Owned' };

  @ApiProperty()
  @Field(() => String)
  condition: string;
}

/***************************************
 * GAMESTOP PRODUCT INVENTORY RESPONSE *
 ***************************************/
@ObjectType({
  description: 'GameStop Product Inventory',
})
export class GameStopProductInventory {
  @ApiProperty()
  @Field(() => String)
  action: string;

  @ApiProperty()
  @Field(() => String)
  queryString: string;

  @ApiProperty()
  @Field(() => String)
  locale: string;

  @ApiProperty()
  @Field(() => String)
  storeId: string;

  @ApiProperty()
  @Field(() => String)
  masterProductId: string;

  @ApiProperty()
  @Field(() => String)
  storeDetails: string;

  @ApiProperty()
  @Field(() => String)
  storePickupDetails: string;

  @ApiProperty()
  @Field(() => Boolean)
  hasVariantsAvailableForPickup: boolean;

  @ApiProperty()
  @Field(() => Boolean)
  hasVariantsAvailableForPickupInStock: boolean;

  @ApiProperty()
  @Field(() => Boolean)
  hasVariantsAvailableForLookup: boolean;

  @ApiProperty()
  @Field(() => Boolean)
  hasCondition: boolean;

  @ApiProperty()
  @Field(() => Int)
  productVariationAttributesLength: number;

  @ApiProperty()
  @Field(() => String)
  actionUrl: string;

  @ApiProperty()
  @Field(() => [GameStopProduct])
  products: GameStopProduct[];
}

/******************************************
 * IS GAMESTOP PRODUCT AVAILABLE RESPONSE *
 ******************************************/
@ObjectType({
  description: 'Maps whether the GameStop product is available and which store',
})
export class GameStopProductAvailableResponse {
  @Field(() => Boolean)
  isAvailable: boolean;

  @Field(() => String)
  storeId;

  @Field(() => String)
  storeDetails: string;

  @Field(() => String)
  productId: string;

  @Field(() => Boolean)
  isAvailableForPickup: boolean;

  @Field(() => String)
  fetchedOn: string;
}
