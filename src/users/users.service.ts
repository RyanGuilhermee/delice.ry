import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  IUsersRepository,
  UsersRepository,
} from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class UsersService implements IUsersRepository {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private ordersService: OrdersService,
    private usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashPassword;

    return this.usersRepository.create(createUserDto);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.password) {
      const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashPassword;
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.findOne(id);

    const order = await this.ordersService.orderHasUserId(id);

    if (order) {
      throw new BadRequestException(
        'Unable to remove user because there are currently active orders',
      );
    }

    return this.usersRepository.remove(id);
  }
}
