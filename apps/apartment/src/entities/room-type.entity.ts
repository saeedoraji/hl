import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Base } from '../../../api-test/src/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class RoomType extends Base {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Field(() => String)
  @Column('varchar', { name: 'title', nullable: false, length: 100 })
  roomType: string;
}
