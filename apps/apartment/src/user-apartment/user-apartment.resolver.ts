import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserApartmentService } from './user-apartment.service';
import { CreateUserApartmentInput } from './dto/create-user-apartment.input';
import { Apartment } from '../entities/apartment.entity';
import {
  CurrentUser,
  GqlAuthGuard,
} from 'apps/user/src/authenticate/guard/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { SearchArgs } from './args/user-apartment.args';

@Resolver(() => Apartment)
export class UserApartmentResolver {
  constructor(private readonly userApartmentService: UserApartmentService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Apartment)
  async createUserApartment(
    @Args('createUserApartmentInput')
    createUserApartmentInput: CreateUserApartmentInput,
    @CurrentUser() user,
  ) {
    try {
      return await this.userApartmentService.create(
        user,
        createUserApartmentInput,
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @Query(() => [Apartment], { name: 'searchApartment' })
  search(@Args() searchArgs: SearchArgs) {
    return this.userApartmentService.search(searchArgs);
  }
}
