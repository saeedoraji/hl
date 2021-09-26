import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateRegisterInput } from './dto/create-register.input';
import { UpdateRegisterInput } from './dto/update-register.input';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
  ) {}
  create(createRegisterInput: CreateRegisterInput) {
    const user = this.UserRepository.create(createRegisterInput);
    return this.UserRepository.save(user);
  }

  findAll() {
    return this.UserRepository.find();
  }

  findOne(id: number) {
    return this.UserRepository.findOne(id);
  }

  findByCondition(condition: FindConditions<User>) {
    return this.UserRepository.find(condition);
  }

  async update(id: number, updateRegisterInput: UpdateRegisterInput) {
    const update = await this.UserRepository.update(id, updateRegisterInput);
    console.log(update, 'the error');
    return true;
  }

  async remove(id: number) {
    const remove = await this.UserRepository.delete(id);
    console.log(remove);
    return true;
  }
}
