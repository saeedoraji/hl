import { Module } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { FavoriteModule } from './favorite/favorite.module';
import { RoomTypeModule } from './room-type/room-type.module';
import { UserApartmentModule } from './user-apartment/user-apartment.module';

@Module({
  imports: [UserApartmentModule, FavoriteModule, RoomTypeModule],
  controllers: [ApartmentController],
  providers: [ApartmentService],
})
export class ApartmentModule {}
