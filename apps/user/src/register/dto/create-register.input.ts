import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRegisterInput {
  @Field(() => String, { description: 'firstname should be filled' })
  firstName: string;

  @Field(() => String, { description: 'lastname should be filled' })
  lastName?: string;

  @Field(() => String, { description: 'choose a password for login' })
  username: string;

  @Field(() => String, { description: 'choose an strong password' })
  password: string;

  @Field(() => [Int], { description: 'provide apartment ids as a list' })
  apartmentIds?: number[];
}
