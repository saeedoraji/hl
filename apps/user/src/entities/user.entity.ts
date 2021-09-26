import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Apartment } from '../../../apartment/src/entities/apartment.entity';
import { Base } from '../../../api-test/src/entities/base.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shared } from '../shared/shared';

@Index('username', ['username'], { unique: true })
@ObjectType()
@Entity('user')
export class User extends Base {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Field(() => Int)
  id: number;

  @Column('varchar', {
    name: 'username',
    nullable: false,
    unique: true,
    length: 100,
  })
  @Field(() => String)
  username: string;
  @Column('varchar', { name: 'firstName', nullable: true, length: 50 })
  @Field(() => String, { nullable: true })
  firstName: string | null;

  @Field(() => String, { nullable: true })
  @Column('varchar', { name: 'lastName', nullable: true, length: 50 })
  lastName: string | null;

  // will be hashed through `bcrypt`
  @Column('varchar', { name: 'password', nullable: false, length: 100 })
  password: string;

  @OneToMany(() => Apartment, (apartment) => apartment.user)
  apartments: Apartment[];

  @BeforeInsert()
  async hashNewPassword() {
    this.password = await Shared.generatePassword(this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await Shared.generatePassword(this.password);
    }
  }
}
