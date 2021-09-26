import { Test, TestingModule } from '@nestjs/testing';
import { RegisterResolver } from './register.resolver';
import { RegisterService } from './register.service';

describe('RegisterResolver', () => {
  let resolver: RegisterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterResolver, RegisterService],
    }).compile();

    resolver = module.get<RegisterResolver>(RegisterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
