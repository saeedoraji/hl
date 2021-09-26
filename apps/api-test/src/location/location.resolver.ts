import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Location } from '../entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'apps/user/src/authenticate/guard/jwt.auth.guard';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Mutation(() => Location)
  @UseGuards(GqlAuthGuard)
  createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput,
  ) {
    return this.locationService.create(createLocationInput);
  }

  @Query(() => [Location], { name: 'location' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.locationService.findAll();
  }
}
