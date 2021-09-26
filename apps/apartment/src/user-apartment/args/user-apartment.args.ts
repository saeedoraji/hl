import { ArgsType, Field, Float, Int } from '@nestjs/graphql';

@ArgsType()
export class SearchArgs {
  @Field(() => String, {
    nullable: true,
    description: 'put part of country name',
  })
  country?: number;

  @Field(() => String, { nullable: true, description: 'put part of city name' })
  city?: number;

  @Field(() => [Float, Float], { description: '[lat, long]', nullable: true })
  coords: [number, number];

  @Field(() => [Int], { nullable: true })
  roomIds?: number[];

  @Field(() => Int, { description: 'set radius for search', nullable: true })
  radius?: number;
}
