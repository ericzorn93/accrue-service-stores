import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, Length } from 'class-validator';

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
