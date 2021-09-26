import { NestFactory } from '@nestjs/core';
import { ApartmentModule } from './apartment.module';

async function bootstrap() {
  const app = await NestFactory.create(ApartmentModule);
  await app.listen(3000);
}
bootstrap();
