import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

/************************
 * COORDINATES RESPONSE *
 ************************/
@ObjectType({ description: "Latitude and Longitude of current user's address" })
export class LocationCoords {
  @ApiProperty()
  @Field(() => String)
  lat: string;

  @ApiProperty()
  @Field(() => String)
  lng: string;
}
