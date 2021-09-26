import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AuthenticateArgs {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}
