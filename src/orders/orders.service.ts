import {
  BadRequestException,
  ForbiddenException,
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
    const menu = await this.menuService.findOne(createOrderDto.menuId);

    if (!user) {
      throw new BadRequestException('Invalid user id');
    }

    if (!menu) {
      throw new BadRequestException('Invalid menu id');
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

    return this.ordersRepository.create(createOrderDto);
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

  findOne(id: string) {
    return this.ordersRepository.findOne(id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.ordersRepository.update(id, updateOrderDto);
  }

  remove(id: string) {
    return this.ordersRepository.remove(id);
  }

  orderHasUserId(userId: string) {
    return this.ordersRepository.orderHasUserId(userId);
  }

  orderHasMenuId(menuId: string) {
    return this.ordersRepository.orderHasMenuId(menuId);
  }
}
