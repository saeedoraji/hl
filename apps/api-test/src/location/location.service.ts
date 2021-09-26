import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly LocationRepository: Repository<Location>,
  ) {}
  async create(createLocationInput: CreateLocationInput) {
    return this.LocationRepository.save(
      this.LocationRepository.create(createLocationInput),
    );
  }

  findAll() {
    return this.LocationRepository.find();
  }

  findOne(id: number) {
    return this.LocationRepository.findOne(id);
  }
}
