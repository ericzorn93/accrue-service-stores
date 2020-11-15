import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: "Latitude and Longitude of current user's address" })
export class LocationCoords {
  @ApiProperty()
  @Field(() => String)
  latitude: string;

  @ApiProperty()
  @Field(() => String)
  longitude: string;
}
