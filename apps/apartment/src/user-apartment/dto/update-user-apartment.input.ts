import { CreateUserApartmentInput } from './create-user-apartment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserApartmentInput extends PartialType(CreateUserApartmentInput) {
  @Field(() => Int)
  id: number;
}
