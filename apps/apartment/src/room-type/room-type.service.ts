import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from 'apps/apartment/src/entities/room-type.entity';
import { Repository } from 'typeorm';
import { CreateRoomTypeInput } from './dto/create-room-type.input';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType)
    private readonly RoomTypeRepository: Repository<RoomType>,
  ) {}
  create(createRoomTypeInput: CreateRoomTypeInput) {
    return this.RoomTypeRepository.save(
      this.RoomTypeRepository.create(createRoomTypeInput),
    );
  }

  findAll() {
    return this.RoomTypeRepository.find();
  }
}
