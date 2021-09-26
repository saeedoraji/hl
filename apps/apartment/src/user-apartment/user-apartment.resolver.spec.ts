import { Test, TestingModule } from '@nestjs/testing';
import { UserApartmentResolver } from './user-apartment.resolver';
import { UserApartmentService } from './user-apartment.service';

describe('UserApartmentResolver', () => {
  let resolver: UserApartmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserApartmentResolver, UserApartmentService],
    }).compile();

    resolver = module.get<UserApartmentResolver>(UserApartmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
