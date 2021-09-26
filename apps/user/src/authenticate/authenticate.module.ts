import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RegisterModule } from '../register/register.module';
import { AuthenticateResolver } from './authenticate.resolver';
import { AuthenticateService } from './authenticate.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: configService.get('EXPIRE_TOKEN'),
        },
        // can be used public key/private key for generating secure tokens
        secret: configService.get('SECRET_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    RegisterModule,
  ],
  providers: [
    AuthenticateService,
    AuthenticateResolver,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AuthenticateModule {}
