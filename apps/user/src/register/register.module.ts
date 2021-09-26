import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterResolver } from './register.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [RegisterResolver, RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
