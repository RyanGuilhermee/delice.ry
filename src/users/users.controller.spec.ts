import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { FindUserDto } from './dto/find-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: DeepMocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should successfuly create a user', async () => {
      const newUser = new CreateUserDto();
      newUser.name = 'test';
      newUser.email = 'test@email.com';
      newUser.password = '12345678';

      const user = new FindUserDto();
      user.id = '123';
      user.name = 'test';
      user.email = 'test@email.com';
      user.isAdmin = false;

      usersService.create.mockResolvedValueOnce(user);

      await expect(controller.create(newUser)).resolves.toEqual({
        statusCode: 201,
        user: {
          ...user,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should successfuly find a user', async () => {
      const id = '123';

      const user = new FindUserDto();
      user.id = '123';
      user.name = 'test';
      user.email = 'test@email.com';
      user.isAdmin = false;

      usersService.findOne.mockResolvedValueOnce(user);

      await expect(controller.findOne(id)).resolves.toEqual({
        statusCode: 200,
        user: {
          ...user,
        },
      });
    });
  });

  describe('update', () => {
    it('should successfuly update a user', async () => {
      const id = '123';

      const updateUser = new UpdateUserDto();
      updateUser.name = 'test2';
      updateUser.password = 'newPassword';

      const user = new FindUserDto();
      user.id = '123';
      user.name = 'test';
      user.email = 'test@email.com';
      user.isAdmin = false;

      usersService.update.mockResolvedValueOnce('User updated successfully!');

      await expect(controller.update(id, updateUser)).resolves.toEqual({
        statusCode: 200,
        message: 'User updated successfully!',
      });
    });
  });

  describe('remove', () => {
    it('should successfuly remove a user', async () => {
      const id = '123';

      usersService.remove.mockResolvedValueOnce('User removed successfully!');

      await expect(controller.remove(id)).resolves.toEqual({
        statusCode: 200,
        message: 'User removed successfully!',
      });
    });
  });
});
