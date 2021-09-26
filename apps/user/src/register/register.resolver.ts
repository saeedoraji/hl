import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RegisterService } from './register.service';
import { CreateRegisterInput } from './dto/create-register.input';
import { UpdateRegisterInput } from './dto/update-register.input';
import { User } from '../entities/user.entity';
import { RegisterArgs } from './args/register.args';
import {
  CurrentUser,
  GqlAuthGuard,
} from '../authenticate/guard/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class RegisterResolver {
  constructor(private readonly registerService: RegisterService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createRegisterInput: CreateRegisterInput,
  ) {
    try {
      return await this.registerService.create(createRegisterInput);
    } catch (e) {
      throw e;
    }
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.registerService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args() { id }: RegisterArgs) {
    return await this.registerService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateRegisterInput: UpdateRegisterInput,
  ) {
    try {
      return this.registerService.update(
        updateRegisterInput.id,
        updateRegisterInput,
      );
    } catch (e) {
      return e.message;
    }
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    try {
      return this.registerService.remove(id);
    } catch (e) {
      return e.message;
    }
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    console.log('user', user);
    return this.registerService.findOne(user.id);
  }
}
