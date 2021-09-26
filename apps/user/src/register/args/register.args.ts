import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RegisterArgs {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: true })
  name?: string;
}
