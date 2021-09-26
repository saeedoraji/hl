import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationService } from '../../../api-test/src/location/location.service';
import { User } from '../../../user/src/entities/user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Apartment } from '../entities/apartment.entity';
import { IPoint } from '../interfaces/IPoint';
import { CreateUserApartmentInput } from './dto/create-user-apartment.input';
import { getConnection } from 'typeorm';
import { SearchArgs } from './args/user-apartment.args';
import { Location } from '../../..//api-test/src/entities/location.entity';
@Injectable()
export class UserApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private readonly ApartmentRepository: Repository<Apartment>,
    private readonly locationService: LocationService,
  ) {}
  async create(
    user: Partial<User>,
    createUserApartmentInput: CreateUserApartmentInput,
  ) {
    const city = await this.checkCity(createUserApartmentInput.city);

    if (!city) {
      throw new Error("`city` shouldn't be a cuontry");
    }
    const coords: IPoint = {
      x: createUserApartmentInput.coords[1],
      y: createUserApartmentInput.coords[0],
    };
    const apartmentObj = {
      ...createUserApartmentInput,
      coords,
    };

    const inserted = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Apartment)
      .values([
        {
          name: createUserApartmentInput.name,
          city: { id: apartmentObj.city },
          coords: () => `point(${coords.x}, ${coords.y})`,
          user: { id: user.id },
        },
      ])
      .execute();

    const apartmentId = inserted.raw.insertId;
    const apartment = this.assignRoomTypeToApartment(
      apartmentId,
      createUserApartmentInput.roomIds,
    );

    return apartment;
  }

  async checkCity(id: number) {
    const city = await this.locationService.findOne(id);
    return !!city.parentId;
  }

  findAll() {
    return this.ApartmentRepository.find();
  }

  findOne(id: number) {
    return this.ApartmentRepository.findOne(id);
  }

  async assignRoomTypeToApartment(apartmentId: number, roomIds: number[]) {
    const apartment = await this.findOne(apartmentId);

    const query = getConnection()
      .createQueryBuilder()
      .relation(Apartment, 'rooms')
      .of(apartment);

    roomIds.forEach((id) => query.add({ id }));

    return apartment;
  }
  async search(searchArgs: SearchArgs) {
    let query = this.ApartmentRepository.createQueryBuilder().innerJoin(
      Location,
      'location',
      'cityId=location.id',
    );
    const searchConfig = this.setSearchCondition(query, searchArgs);
    query = searchConfig.setGeoLocationSearch();
    query = searchConfig.setLocationSearch();
    query = searchConfig.setRoom();

    return await query.getMany();
  }

  setSearchCondition(
    query: SelectQueryBuilder<Apartment>,
    searchArgs: SearchArgs,
  ) {
    return {
      setGeoLocationSearch: () => this.setGeoLocationSearch(query, searchArgs),
      setLocationSearch: () => this.setLocationSearch(query, searchArgs),
      setRoom: () => this.setRoom(query, searchArgs),
    };
  }

  setGeoLocationSearch(
    query: SelectQueryBuilder<Apartment>,
    searchArgs: SearchArgs,
  ) {
    if (searchArgs.coords && searchArgs.radius) {
      query.where(
        'st_distance_sphere(coords, POINT(:lat, :long ))/1000 > :radius',
        {
          lat: searchArgs.coords[0],
          long: searchArgs.coords[1],
          radius: searchArgs.radius,
        },
      );
    }
    return query;
  }

  setLocationSearch(
    query: SelectQueryBuilder<Apartment>,
    searchArgs: SearchArgs,
  ) {
    if (searchArgs.city) {
      query.andWhere(
        'location.title like :city and location.parentId is not null',
        { city: `%${searchArgs.city}%` },
      );
    }

    if (searchArgs.country) {
      query.andWhere(
        '(select title from location l where l.id=location.parentId) like :country',
        { country: `%${searchArgs.country}%` },
      );
    }
    return query;
  }

  setRoom(query: SelectQueryBuilder<Apartment>, searchArgs: SearchArgs) {
    if (searchArgs.roomIds) {
      query.innerJoin(
        'apartment_rooms_room_type',
        'rooms',
        'rooms.apartmentId=apartment.id and rooms.roomTypeId in (:roomIds)',
        { roomIds: searchArgs.roomIds },
      );
    }
    return query;
  }
}
