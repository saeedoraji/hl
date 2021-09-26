import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

import { AuthenticateModule } from './authenticate/authenticate.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [AuthenticateModule, RegisterModule],
  controllers: [UserController],
  exports: [UserModule],
})
export class UserModule {}
