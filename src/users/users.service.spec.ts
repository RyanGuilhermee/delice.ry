import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { UsersRepository } from '../repositories/users.repository';
import { OrdersService } from '../orders/orders.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { BadRequestException, HttpException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: DeepMocked<UsersRepository>;
  let ordersService: DeepMocked<OrdersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(UsersRepository);
    ordersService = module.get(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const newUser = new CreateUserDto();
      newUser.name = 'test';
      newUser.email = 'test@email.com';
      newUser.password = '12345678';

      const user = new FindUserDto();
      user.id = '123';
      user.name = 'test';
      user.email = 'test@email.com';
      user.isAdmin = false;

      usersRepository.findOneByEmail.mockResolvedValueOnce(null);

      usersRepository.create.mockResolvedValueOnce(user);

      await expect(service.create(newUser)).resolves.toBe(user);
    });

    it('should throw an exception if a user exists', async () => {
      const newUser = new CreateUserDto();
      newUser.name = 'test';
      newUser.email = 'test@email.com';
      newUser.password = '12345678';

      usersRepository.findOneByEmail.mockResolvedValueOnce({
        id: '123',
        name: 'test',
        email: 'test@email.com',
        password: '12345678',
        is_admin: false,
      });

      await expect(service.create(newUser)).rejects.toBeInstanceOf(
        HttpException,
      );

      await expect(service.create(newUser)).rejects.toThrow(
        'User already exists',
      );
    });
  });

  describe('findOne', () => {
    it('should successfully find a user', async () => {
      const id = '123';

      const user = new FindUserDto();
      user.id = '123';
      user.name = 'test';
      user.email = 'test@email.com';
      user.isAdmin = false;

      usersRepository.findOne.mockResolvedValueOnce(user);

      await expect(service.findOne(id)).resolves.toBe(user);
    });

    it('should throw an exception if a user was not found', async () => {
      const id = '1';

      usersRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toBeInstanceOf(HttpException);

      await expect(service.findOne(id)).rejects.toThrow('User not found');
    });
  });

  describe('update', () => {
    it('should successfully update a user', async () => {
      const id = '123';

      const updateUser = new UpdateUserDto();
      updateUser.name = 'test2';
      updateUser.password = 'newPassword';

      const user = new FindUserDto();
      user.id = '123';
      user.name = 'test';
      user.email = 'test@email.com';
      user.isAdmin = false;

      usersRepository.findOne.mockResolvedValueOnce(user);

      usersRepository.update.mockResolvedValueOnce(
        'User updated successfully!',
      );

      await expect(service.update(id, updateUser)).resolves.toBe(
        'User updated successfully!',
      );
    });
  });

  describe('remove', () => {
    it('should successfully remove a user', async () => {
      const id = '123';

      const user = new FindUserDto();
      user.id = '123';
      user.name = 'test';
      user.email = 'test@email.com';
      user.isAdmin = false;

      usersRepository.findOne.mockResolvedValueOnce(user);

      ordersService.orderHasUserId.mockResolvedValueOnce(false);

      usersRepository.remove.mockResolvedValueOnce(
        'User removed successfully!',
      );

      await expect(service.remove(id)).resolves.toBe(
        'User removed successfully!',
      );
    });

    it('should throw an exception if a user has active orders', async () => {
      const id = '123';

      const user = new FindUserDto();
      user.id = '123';
      user.name = 'test';
      user.email = 'test@email.com';
      user.isAdmin = false;

      usersRepository.findOne.mockResolvedValueOnce(user);

      ordersService.orderHasUserId.mockResolvedValueOnce(true);

      await expect(service.remove(id)).rejects.toBeInstanceOf(
        BadRequestException,
      );

      await expect(service.remove(id)).rejects.toThrow(
        'Unable to remove user because there are currently active orders',
      );
    });
  });
});
