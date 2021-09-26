import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field(() => String, { description: '' })
  title: string;

  @Field(() => Int, { description: '', nullable: true })
  parentId: number;
}
