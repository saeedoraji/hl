import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { Apartment } from 'apps/apartment/src/entities/apartment.entity';
import { RoomType } from 'apps/apartment/src/entities/room-type.entity';
import { User } from 'apps/user/src/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Location } from './entities/location.entity';
import { UserModule } from 'apps/user/src/user.module';
import { ApartmentModule } from 'apps/apartment/src/apartment.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      debug: true, // default: true, can be get .env
      playground: true, // default: true, can be get .env
      autoSchemaFile: 'schema.gql',
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
        };
        return graphQLFormattedError;
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: parseInt(configService.get<string>('MYSQL_PORT')),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_ROOT_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [User, Location, Apartment, RoomType],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ApartmentModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
