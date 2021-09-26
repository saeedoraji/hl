import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterService } from '../register/register.service';
import { Shared } from '../shared/shared';
import { TokenBody } from './authenticate.interface';

@Injectable()
export class AuthenticateService {
  constructor(
    private jwtService: JwtService,
    private userService: RegisterService,
  ) {}

  // can be used for refresh token as well
  async generateToken(payload: TokenBody) {
    // TODO: store token in database and redis
    // TODO: set expiration
    return this.jwtService.sign(payload);
  }

  async login(username: string, password: string) {
    const user = await this.userService.findByCondition({
      username,
    });
    if (user.length) {
      const isValidPassword = await Shared.checkPasswword(
        password,
        user[0].password,
      );
      if (isValidPassword) {
        return user[0];
      }
      return null;
    }
  }
}
