import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { UsersService } from '../users/users.service';
import { OrdersRepository } from '../repositories/orders.repostory';
import { MenuService } from '../menu/menu.service';
import { PaymentService } from '../payment/payment.service';
import { CreateOrderDto, Orders, PaymentType } from './dto/create-order.dto';
import { FindUserDto } from '../users/dto/find-user.dto';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
} from '@nestjs/common';
import { FindAllOrderDto } from './dto/findall-order.dto';
import { FindOrderDto } from './dto/find-order.dto';
import { FindMenuDto } from '../menu/dto/find-menu.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;
  let usersService: DeepMocked<UsersService>;
  let ordersRepository: DeepMocked<OrdersRepository>;
  let menuService: DeepMocked<MenuService>;
  let paymentService: DeepMocked<PaymentService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<OrdersService>(OrdersService);
    usersService = module.get(UsersService);
    ordersRepository = module.get(OrdersRepository);
    menuService = module.get(MenuService);
    paymentService = module.get(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create an order with payment type equal to money', async () => {
      const order1 = new Orders();
      order1.menuId = '12345';
      order1.quantity = 1;

      const order2 = new Orders();
      order2.menuId = '123456';
      order2.quantity = 2;

      const newOrder = new CreateOrderDto();
      newOrder.userId = '123';
      newOrder.paymentType = PaymentType.MONEY;
      newOrder.orders = [order1, order2];

      usersService.findOne.mockResolvedValueOnce(new FindUserDto());

      menuService.findAllMenuIds.mockResolvedValueOnce([
        { id: '12345' },
        { id: '123456' },
      ]);

      ordersRepository.create.mockResolvedValue(newOrder.userId);

      await expect(service.create(newOrder)).resolves.toBe(newOrder.userId);

      expect(ordersRepository.create).toBeCalledTimes(2);

      expect(newOrder.isPaid).toBe(false);
    });

    it('should successfully create an order with payment type equal to credit', async () => {
      const order1 = new Orders();
      order1.menuId = '12345';
      order1.quantity = 1;

      const order2 = new Orders();
      order2.menuId = '123456';
      order2.quantity = 2;

      const newOrder = new CreateOrderDto();
      newOrder.userId = '123';
      newOrder.paymentType = PaymentType.CREDIT;
      newOrder.paymentId = 123;
      newOrder.orders = [order1, order2];

      usersService.findOne.mockResolvedValueOnce(new FindUserDto());

      menuService.findAllMenuIds.mockResolvedValueOnce([
        { id: '12345' },
        { id: '123456' },
      ]);

      paymentService.findPayment.mockResolvedValueOnce({
        status: 'approved',
        api_response: { headers: ['', []], status: 200 },
      });

      ordersRepository.create.mockResolvedValue(newOrder.userId);

      await expect(service.create(newOrder)).resolves.toBe(newOrder.userId);

      expect(ordersRepository.create).toBeCalledTimes(2);

      expect(newOrder.isPaid).toBe(true);
    });

    it('should throw an exception if user id was not found', async () => {
      const newOrder = new CreateOrderDto();

      usersService.findOne.mockResolvedValue(null);

      await expect(service.create(newOrder)).rejects.toBeInstanceOf(
        BadRequestException,
      );

      await expect(service.create(newOrder)).rejects.toThrow('Invalid user id');
    });

    it('should throw an exception if menu ids was not found', async () => {
      const order1 = new Orders();
      order1.menuId = '12345';

      const order2 = new Orders();
      order2.menuId = '123456';

      const newOrder = new CreateOrderDto();
      newOrder.orders = [order1, order2];

      usersService.findOne.mockResolvedValue(new FindUserDto());

      menuService.findAllMenuIds.mockResolvedValue([
        { id: '1234' },
        { id: '123456' },
      ]);

      await expect(service.create(newOrder)).rejects.toBeInstanceOf(
        BadRequestException,
      );

      await expect(service.create(newOrder)).rejects.toThrow('Invalid menu id');
    });

    it('should throw an exception if payment id is missing', async () => {
      const order1 = new Orders();
      order1.menuId = '12345';

      const order2 = new Orders();
      order2.menuId = '123456';

      const newOrder = new CreateOrderDto();
      newOrder.paymentType = PaymentType.CREDIT;
      newOrder.orders = [order1, order2];

      usersService.findOne.mockResolvedValue(new FindUserDto());

      menuService.findAllMenuIds.mockResolvedValue([
        { id: '12345' },
        { id: '123456' },
      ]);

      await expect(service.create(newOrder)).rejects.toBeInstanceOf(
        BadRequestException,
      );

      await expect(service.create(newOrder)).rejects.toThrow(
        'Payment id missing',
      );
    });

    it('should throw an exception if payment is rejected', async () => {
      const order1 = new Orders();
      order1.menuId = '12345';

      const order2 = new Orders();
      order2.menuId = '123456';

      const newOrder = new CreateOrderDto();
      newOrder.paymentType = PaymentType.CREDIT;
      newOrder.paymentId = 123;
      newOrder.orders = [order1, order2];

      usersService.findOne.mockResolvedValue(new FindUserDto());

      menuService.findAllMenuIds.mockResolvedValue([
        { id: '12345' },
        { id: '123456' },
      ]);

      paymentService.findPayment.mockResolvedValueOnce({
        status: 'rejected',
        api_response: { headers: ['', []], status: 200 },
      });

      await expect(service.create(newOrder)).rejects.toBeInstanceOf(
        BadRequestException,
      );

      await expect(service.create(newOrder)).rejects.toThrow(
        'Payment rejected',
      );
    });
  });

  describe('findAll', () => {
    it('should successfully find all orders by non-admins', async () => {
      const findAllOrderDto = new FindAllOrderDto();
      findAllOrderDto.userId = '123';

      const findUser = new FindUserDto();
      findUser.isAdmin = false;

      usersService.findOne.mockResolvedValueOnce(findUser);

      ordersRepository.findAll.mockResolvedValueOnce([]);

      await expect(service.findAll(findAllOrderDto)).resolves.toEqual([]);
    });

    it('should successfully find all orders by admins', async () => {
      const findAllOrderDto = new FindAllOrderDto();
      findAllOrderDto.userId = '123';

      const findUser = new FindUserDto();
      findUser.isAdmin = true;

      usersService.findOne.mockResolvedValueOnce(findUser);

      ordersRepository.findAll.mockResolvedValueOnce([]);

      await expect(service.findAll(findAllOrderDto)).resolves.toEqual([]);
      expect(findAllOrderDto.userId).toBe('');
    });

    it('should throws an exception if the user id is not provided', async () => {
      const findAllOrderDto = new FindAllOrderDto();

      await expect(service.findAll(findAllOrderDto)).rejects.toBeInstanceOf(
        ForbiddenException,
      );

      await expect(service.findAll(findAllOrderDto)).rejects.toThrow(
        'Inform your user id to get this resource',
      );
    });

    it('should verify when quantity is empty, then assign "10" as default value', async () => {
      const findAllOrderDto = new FindAllOrderDto();
      findAllOrderDto.userId = '123';
      findAllOrderDto.quantity = '';

      ordersRepository.findAll(findAllOrderDto);

      await service.findAll(findAllOrderDto);

      expect(findAllOrderDto.quantity).toBe('10');
    });

    it('should verify when quantity is NaN, then assign "10" as default value', async () => {
      const findAllOrderDto = new FindAllOrderDto();
      findAllOrderDto.userId = '123';
      findAllOrderDto.quantity = 'NaN';

      ordersRepository.findAll(findAllOrderDto);

      await service.findAll(findAllOrderDto);

      expect(findAllOrderDto.quantity).toBe('10');
    });

    it('should verify when page is empty, then assign "1" as default value', async () => {
      const findAllOrderDto = new FindAllOrderDto();
      findAllOrderDto.userId = '123';
      findAllOrderDto.page = '';

      ordersRepository.findAll(findAllOrderDto);

      await service.findAll(findAllOrderDto);

      expect(findAllOrderDto.page).toBe('1');
    });

    it('should verify when page is NaN, then assign "1" as default value', async () => {
      const findAllOrderDto = new FindAllOrderDto();
      findAllOrderDto.userId = '123';
      findAllOrderDto.page = '';

      ordersRepository.findAll(findAllOrderDto);

      await service.findAll(findAllOrderDto);

      expect(findAllOrderDto.page).toBe('1');
    });
  });

  describe('findOne', () => {
    it('should successfully return an order', async () => {
      const id = '123';

      const findOneResponse = {
        order: new FindOrderDto(),
        menu: new FindMenuDto(),
        user: new FindUserDto(),
      };

      ordersRepository.findOne.mockResolvedValue(findOneResponse);

      await expect(service.findOne(id)).resolves.toBe(findOneResponse);
    });

    it('should throw an exception if an order was not found', async () => {
      const id = '';

      ordersRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toBeInstanceOf(HttpException);

      await expect(service.findOne(id)).rejects.toThrow('order not found');
    });
  });

  describe('update', () => {
    it('should successfully update an order', async () => {
      const id = '123';

      const updateOrderDto = new UpdateOrderDto();

      ordersRepository.update.mockResolvedValue('Order updated successfully!');

      await expect(service.update(id, updateOrderDto)).resolves.toBe(
        'Order updated successfully!',
      );
    });
  });

  describe('remove', () => {
    it('should successfully remove an order', async () => {
      const id = '123';

      ordersRepository.remove.mockResolvedValue('Order removed successfully!');

      await expect(service.remove(id)).resolves.toBe(
        'Order removed successfully!',
      );
    });
  });

  describe('orderHasUserId', () => {
    it('should successfully return true if an order has a record relating with an user id', async () => {
      const userId = '123';

      ordersRepository.orderHasUserId.mockResolvedValueOnce(true);

      await expect(service.orderHasUserId(userId)).resolves.toBe(true);
    });

    it('should successfully return false if an order not has a record relating with an user id', async () => {
      const userId = '123';

      ordersRepository.orderHasUserId.mockResolvedValueOnce(false);

      await expect(service.orderHasUserId(userId)).resolves.toBe(false);
    });
  });

  describe('orderHasMenuId', () => {
    it('should successfully return true if an order has a record relating with a menu id', async () => {
      const menuId = '123';

      ordersRepository.orderHasMenuId.mockResolvedValueOnce(true);

      await expect(service.orderHasMenuId(menuId)).resolves.toBe(true);
    });

    it('should successfully return false if an order not has a record relating with a menu id', async () => {
      const menuId = '123';

      ordersRepository.orderHasMenuId.mockResolvedValueOnce(false);

      await expect(service.orderHasMenuId(menuId)).resolves.toBe(false);
    });
  });
});
