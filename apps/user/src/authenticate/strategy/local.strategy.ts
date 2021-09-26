import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthenticateService } from '../authenticate.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticateService: AuthenticateService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authenticateService.login(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
