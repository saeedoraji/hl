import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticateArgs } from './args/authenticate.args';
import { AuthenticateService } from './authenticate.service';

import { Authenticate } from './models/authenticate.model';
import { CurrentUser, LocalAuthGuard } from './guard/local.auth.gaurd';

@Resolver(() => Authenticate)
export class AuthenticateResolver {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => Authenticate, { name: 'login' })
  async login(
    @CurrentUser() user,
    @Args() login: AuthenticateArgs,
  ): Promise<Authenticate> {
    const token = await this.authenticateService.generateToken({ id: user.id });
    return {
      token: token,
      user: user,
      status: !!token,
    };
  }
}
