import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomTypeInput {
  @Field(() => String, { description: '' })
  roomType: string;
}
