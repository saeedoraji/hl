import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Base } from '../../../api-test/src/entities/base.entity';
import { Location } from '../../../api-test/src/entities/location.entity';
import { User } from '../../../user/src/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomType } from './room-type.entity';

@ObjectType()
@Entity('apartment')
export class Apartment extends Base {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => String)
  @Column('varchar', {
    name: 'name',
    length: 250,
  })
  name: string | null;

  @Field(() => String)
  @Column({
    type: 'point',
    nullable: true,
    transformer: {
      from: (v) => v,
      to: (v) => `${v.x},${v.y}`,
    },
  })
  coords: string;

  @ManyToMany(() => RoomType)
  @JoinTable()
  rooms: RoomType[];

  @Field(() => String)
  @ManyToOne(() => Location, (location) => location.apartments)
  city: Location;

  @ManyToOne(() => User, (user) => user.apartments)
  user: User;
}
