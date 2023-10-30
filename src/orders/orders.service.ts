import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateOrderDto, PaymentType } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  IOrdersRepository,
  OrdersRepository,
} from '../repositories/orders.repostory';
import { FindAllOrderDto } from './dto/findall-order.dto';
import { UsersService } from '../users/users.service';
import { MenuService } from '../menu/menu.service';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrdersService implements IOrdersRepository {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private ordersRepository: OrdersRepository,
    private menuService: MenuService,
    private paymentService: PaymentService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.usersService.findOne(createOrderDto.userId);

    if (!user) {
      throw new BadRequestException('Invalid user id');
    }

    const menuIds = await this.menuService.findAllMenuIds();

    for (const order of createOrderDto.orders) {
      const menu = menuIds.find((menu) => menu.id === order.menuId);

      if (!menu) {
        throw new BadRequestException('Invalid menu id');
      }
    }

    if (createOrderDto.paymentType === PaymentType.MONEY) {
      createOrderDto.isPaid = false;
    }

    if (
      createOrderDto.paymentType !== PaymentType.MONEY &&
      !createOrderDto.paymentId
    ) {
      throw new BadRequestException('Payment id missing');
    }

    if (
      createOrderDto.paymentType !== PaymentType.MONEY &&
      createOrderDto.paymentId
    ) {
      const paymentResponse = await this.paymentService.findOne(
        createOrderDto.paymentId,
      );

      if (paymentResponse.status !== 'approved') {
        throw new BadRequestException('Payment rejected');
      }

      createOrderDto.isPaid = true;
    }

    let userId = '';

    for await (const order of createOrderDto.orders) {
      createOrderDto.menuId = order.menuId;
      createOrderDto.quantity = order.quantity;

      userId = await this.ordersRepository.create(createOrderDto);
    }

    return userId;
  }

  async findAll(findAllOrderDto: FindAllOrderDto) {
    if (!findAllOrderDto.userId) {
      throw new ForbiddenException('Inform your user id to get this resource');
    }

    if (!findAllOrderDto.quantity || isNaN(Number(findAllOrderDto.quantity))) {
      findAllOrderDto.quantity = '10';
    }

    if (!findAllOrderDto.page || isNaN(Number(findAllOrderDto.page))) {
      findAllOrderDto.page = '1';
    }

    const user = await this.usersService.findOne(findAllOrderDto.userId);

    if (user.isAdmin) {
      findAllOrderDto.userId = '';
    }

    return this.ordersRepository.findAll(findAllOrderDto);
  }

  async findOne(id: string) {
    const order = await this.ordersRepository.findOne(id);

    if (!order) {
      throw new HttpException('order not found', HttpStatus.NOT_FOUND);
    }

    return this.ordersRepository.findOne(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    return this.ordersRepository.update(id, updateOrderDto);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.ordersRepository.remove(id);
  }

  orderHasUserId(userId: string) {
    return this.ordersRepository.orderHasUserId(userId);
  }

  orderHasMenuId(menuId: string) {
    return this.ordersRepository.orderHasMenuId(menuId);
  }
}
