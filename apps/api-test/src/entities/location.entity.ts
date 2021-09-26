import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Apartment } from '../../../apartment/src/entities/apartment.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TreeParent,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
@ObjectType()
export class Location extends Base {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => String)
  @Column('varchar', { name: 'title', nullable: false })
  title: string;

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Location;

  @Field(() => Int, { nullable: true })
  @Column('varchar', { name: 'parentId', nullable: true })
  parentId: number;

  @OneToMany(() => Apartment, (apartment) => apartment.city)
  apartments: Apartment[];
}
