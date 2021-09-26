import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';

describe('ApartmentController', () => {
  let apartmentController: ApartmentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApartmentController],
      providers: [ApartmentService],
    }).compile();

    apartmentController = app.get<ApartmentController>(ApartmentController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apartmentController.getHello()).toBe('Hello World!');
    });
  });
});
