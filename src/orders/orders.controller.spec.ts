import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindAllOrderDto } from './dto/findall-order.dto';
import { FindOrderDto } from './dto/find-order.dto';
import { FindMenuDto } from '../menu/dto/find-menu.dto';
import { FindUserDto } from '../users/dto/find-user.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let ordersService: DeepMocked<OrdersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<OrdersController>(OrdersController);
    ordersService = module.get(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create an order', async () => {
      const userId = '123';

      ordersService.create.mockResolvedValueOnce(userId);

      await expect(controller.create(new CreateOrderDto())).resolves.toEqual({
        statusCode: 201,
        userId,
      });
    });
  });

  describe('findAll', () => {
    it('should successfully find all orders', async () => {
      ordersService.findAll.mockResolvedValueOnce([]);

      await expect(controller.findAll(new FindAllOrderDto())).resolves.toEqual({
        statusCode: 200,
        orders: [],
      });
    });
  });

  describe('findOne', () => {
    it('should successfully find an order', async () => {
      const id = '123';

      const findOneResponse = {
        order: new FindOrderDto(),
        menu: new FindMenuDto(),
        user: new FindUserDto(),
      };

      ordersService.findOne.mockResolvedValueOnce(findOneResponse);

      await expect(controller.findOne(id)).resolves.toEqual({
        statusCode: 200,
        ...findOneResponse,
      });
    });
  });

  describe('update', () => {
    it('should successfully update an order', async () => {
      const id = '123';

      ordersService.update.mockResolvedValueOnce('Order updated successfully!');

      await expect(
        controller.update(id, new UpdateOrderDto()),
      ).resolves.toEqual({
        statusCode: 200,
        message: 'Order updated successfully!',
      });
    });
  });

  describe('remove', () => {
    it('should successfully remove an order', async () => {
      const id = '123';

      ordersService.remove.mockResolvedValueOnce('Order removed successfully!');

      await expect(controller.remove(id)).resolves.toEqual({
        statusCode: 200,
        message: 'Order removed successfully!',
      });
    });
  });
});
