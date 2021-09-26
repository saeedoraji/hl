import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../entities/user.entity';

@ObjectType()
export class Authenticate {
  @Field(() => String, {
    description: 'store token and send is as `Bearer` in header',
  })
  token: string;

  // future use: in active, blocked, ...
  @Field(() => Boolean, { description: 'user status' })
  status?: boolean;

  @Field(() => User, { description: 'user logged in' })
  user: User;
}
