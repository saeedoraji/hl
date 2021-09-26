import { Controller, Get } from '@nestjs/common';
import { ApartmentService } from './apartment.service';

@Controller()
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get()
  getHello(): string {
    return this.apartmentService.getHello();
  }
}
