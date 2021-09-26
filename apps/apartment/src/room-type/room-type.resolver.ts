import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoomTypeService } from './room-type.service';

import { CreateRoomTypeInput } from './dto/create-room-type.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'apps/user/src/authenticate/guard/jwt.auth.guard';
import { RoomType } from '../entities/room-type.entity';

@Resolver(() => RoomType)
export class RoomTypeResolver {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Mutation(() => RoomType)
  @UseGuards(GqlAuthGuard)
  createRoomType(
    @Args('createRoomTypeInput') createRoomTypeInput: CreateRoomTypeInput,
  ) {
    return this.roomTypeService.create(createRoomTypeInput);
  }

  @Query(() => [RoomType], { name: 'roomType' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.roomTypeService.findAll();
  }
}
