import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from '../../../api-test/src/location/location.service';
import { RoomTypeService } from '../room-type/room-type.service';
import { UserApartmentService } from './user-apartment.service';
const userId = 1;
describe('UserApartmentService', () => {
  let apartmentService: UserApartmentService;
  let locationService: LocationService;
  let roomTypeService: RoomTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserApartmentService],
    }).compile();

    const locationModule: TestingModule = await Test.createTestingModule({
      providers: [LocationService],
    }).compile();

    const roomTypeModule: TestingModule = await Test.createTestingModule({
      providers: [RoomTypeService],
    }).compile();

    apartmentService = module.get<UserApartmentService>(UserApartmentService);
    locationService = locationModule.get<LocationService>(LocationService);
    roomTypeService = roomTypeModule.get<RoomTypeService>(RoomTypeService);
  });

  it('should be defined', () => {
    expect(apartmentService).toBeDefined();
  });
  it('Create apartment including creating Location, RoomType', async () => {
    const country = await locationService.create({
      title: 'Test country',
      parentId: null,
    });
    const city = await locationService.create({
      title: 'Test city',
      parentId: country.id,
    });

    const roomType1 = await roomTypeService.create({ roomType: 'Test1 room' });
    const roomType2 = await roomTypeService.create({ roomType: 'Test2 room' });
    const apartment = await apartmentService.create(
      { id: userId },
      {
        city: city.id,
        coords: [35.70380135437617, 51.394048313106],
        name: 'Test apartment',
        roomIds: [roomType1.id, roomType2.id],
      },
    );

    const lastApartment = await apartmentService.findOne(apartment.id);
    expect([apartment.id, lastApartment.id]).toEqual([
      apartment.id,
      lastApartment.id,
    ]);
  });
});
