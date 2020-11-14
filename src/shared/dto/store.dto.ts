import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

/**************
 * MAIN STORE *
 **************/
@ObjectType({ description: 'Main Store Input Type' })
export class StoreLocation {
  @Field(() => String)
  storeName: string;

  @Field(() => String)
  streetAddress: string;
}

/*******************************
 * STORE LOCATION SEARCH INPUT *
 *******************************/
@InputType({ description: 'Input Location Type to Search for Stores' })
export class StoreSearchLocationInput {
  @Field(() => Int)
  houseNumber: number;

  @Field(() => String)
  streetName: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  zipCode: string;

  @Field(() => String, { defaultValue: 'us' })
  country: string;
}
