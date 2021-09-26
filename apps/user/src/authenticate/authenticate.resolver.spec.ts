import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateResolver } from './authenticate.resolver';
import { AuthenticateService } from './authenticate.service';

describe('AuthResolver', () => {
  let resolver: AuthenticateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticateResolver, AuthenticateService],
    }).compile();

    resolver = module.get<AuthenticateResolver>(AuthenticateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
