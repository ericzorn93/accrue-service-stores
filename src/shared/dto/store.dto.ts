import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

/**************
 * MAIN STORE *
 **************/
@ObjectType({ description: 'Main Store Input Type' })
export class StoreLocation {
  @ApiProperty()
  @Field(() => String)
  storeName: string;

  @ApiProperty()
  @Field(() => String)
  streetAddress: string;
}

/*******************************
 * STORE LOCATION SEARCH INPUT *
 *******************************/
@InputType({ description: 'Input Location Type to Search for Stores' })
export class StoreSearchLocationInput {
  @ApiProperty()
  @Field(() => Int)
  houseNumber: number;

  @ApiProperty()
  @Field(() => String)
  streetName: string;

  @ApiProperty()
  @Field(() => String)
  city: string;

  @ApiProperty()
  @Field(() => String)
  state: string;

  @ApiProperty()
  @Field(() => String)
  zipCode: string;

  @ApiProperty()
  @Field(() => String, { defaultValue: 'us' })
  country: string;
}
