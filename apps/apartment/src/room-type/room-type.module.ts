import { Module } from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { RoomTypeResolver } from './room-type.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from 'apps/apartment/src/entities/room-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  providers: [RoomTypeResolver, RoomTypeService],
})
export class RoomTypeModule {}
