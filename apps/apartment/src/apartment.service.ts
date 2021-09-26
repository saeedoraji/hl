import { Injectable } from '@nestjs/common';

@Injectable()
export class ApartmentService {
  getHello(): string {
    return 'Hello World!';
  }
}
