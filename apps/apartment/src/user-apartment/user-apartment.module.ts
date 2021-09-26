import { Module } from '@nestjs/common';
import { UserApartmentService } from './user-apartment.service';
import { UserApartmentResolver } from './user-apartment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from '../entities/apartment.entity';
import { LocationService } from 'apps/api-test/src/location/location.service';
import { Location } from 'apps/api-test/src/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment, Location])],
  providers: [UserApartmentResolver, UserApartmentService, LocationService],
  exports: [UserApartmentService],
})
export class UserApartmentModule {}
