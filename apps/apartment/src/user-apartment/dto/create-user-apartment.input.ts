import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { Location } from 'apps/api-test/src/entities/location.entity';

@InputType()
export class CreateUserApartmentInput {
  @Field(() => String, { description: 'name of apartment' })
  name: string;

  @Field(() => [Float, Float], { description: 'set lat and long' })
  coords: [number, number];

  @Field(() => [Int!], { description: 'send room type ids' })
  roomIds: Array<number>;

  @Field(() => Int, { description: '' })
  city: number;
}
