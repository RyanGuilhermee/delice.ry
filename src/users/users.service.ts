import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  IUsersRepository,
  UsersRepository,
} from '../repositories/users.repository';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements IUsersRepository {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashPassword;

    return this.usersRepository.create(createUserDto);
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashPassword;
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
