import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { FindOrderDto } from '../orders/dto/find-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { FindUserDto } from '../users/dto/find-user.dto';
import { FindMenuDto } from '../menu/dto/find-menu.dto';
import { FindAllOrderDto } from '../orders/dto/findall-order.dto';

export interface IOrdersRepository {
  create(CreateOrderDto: CreateOrderDto): Promise<string>;

  findOne(id: string): Promise<{
    order: FindOrderDto;
    user: FindUserDto;
    menu: FindMenuDto;
  } | null>;

  findAll(findAllOrderDto: FindAllOrderDto): Promise<
    {
      order: FindOrderDto;
      user: FindUserDto;
      menu: FindMenuDto;
    }[]
  >;

  orderHasUserId(userId: string): Promise<boolean>;

  orderHasMenuId(menuId: string): Promise<boolean>;

  update(id: string, UpdateOrderDto: UpdateOrderDto): Promise<string>;

  remove(id: string): Promise<string>;
}

@Injectable()
export class OrdersRepository
  extends PrismaClient
  implements IOrdersRepository
{
  async create(createOrderDto: CreateOrderDto): Promise<string> {
    const order = await this.orders.create({
      data: {
        payment_type: createOrderDto.paymentType,
        delivery: createOrderDto.delivery,
        quantity: createOrderDto.quantity,
        observations: createOrderDto.observations,
        is_paid: createOrderDto.isPaid,
        order_state: createOrderDto.orderState,
        user_id: createOrderDto.userId,
        menu_id: createOrderDto.menuId,
      },
    });

    return order.user_id;
  }

  async findOne(id: string): Promise<{
    order: FindOrderDto;
    user: FindUserDto;
    menu: FindMenuDto;
  } | null> {
    const order = await this.orders.findFirst({
      where: { id },
      include: {
        users: {},
        menu: {},
      },
    });

    if (!order) {
      return null;
    }

    const orderDto = new FindOrderDto();
    orderDto.id = order.id;
    orderDto.paymentType = order.payment_type;
    orderDto.quantity = order.quantity;
    orderDto.observations = order.observations;
    orderDto.isPaid = order.is_paid;
    orderDto.orderState = order.order_state;
    orderDto.date = order.date;

    const userDto = new FindUserDto();
    userDto.id = order.users.id;
    userDto.name = order.users.name;
    userDto.email = order.users.email;

    const menuDto = new FindMenuDto();
    menuDto.id = order.menu.id;
    menuDto.category = order.menu.category;
    menuDto.name = order.menu.name;
    menuDto.price = Number(order.menu.price);
    menuDto.description = order.menu.description;
    menuDto.image = order.menu.image;
    menuDto.available = order.menu.available;

    return {
      order: orderDto,
      user: userDto,
      menu: menuDto,
    };
  }

  async orderHasUserId(userId: string): Promise<boolean> {
    const order = await this.orders.findFirst({
      where: { user_id: userId },
    });

    if (!order) {
      return false;
    }

    return true;
  }

  async orderHasMenuId(menuId: string): Promise<boolean> {
    const order = await this.orders.findFirst({
      where: { menu_id: menuId },
    });

    if (!order) {
      return false;
    }

    return true;
  }

  async findAll(findAllOrderDto: FindAllOrderDto) {
    const orders = await this.orders.findMany({
      take: Number(findAllOrderDto.quantity),
      skip: Number(findAllOrderDto.page) - 1,
      where: findAllOrderDto.userId
        ? {
            user_id: findAllOrderDto.userId,
            order_state: findAllOrderDto.orderState,
          }
        : {
            order_state: findAllOrderDto.orderState,
          },
      include: {
        users: {},
        menu: {},
      },
    });

    const newFindOrderDto = orders.map((order) => {
      const orderDto = new FindOrderDto();
      orderDto.id = order.id;
      orderDto.paymentType = order.payment_type;
      orderDto.quantity = order.quantity;
      orderDto.observations = order.observations;
      orderDto.isPaid = order.is_paid;
      orderDto.orderState = order.order_state;
      orderDto.date = order.date;

      const userDto = new FindUserDto();
      userDto.id = order.users.id;
      userDto.name = order.users.name;
      userDto.email = order.users.email;

      const menuDto = new FindMenuDto();
      menuDto.id = order.menu.id;
      menuDto.category = order.menu.category;
      menuDto.name = order.menu.name;
      menuDto.price = Number(order.menu.price);
      menuDto.description = order.menu.description;
      menuDto.image = order.menu.image;
      menuDto.available = order.menu.available;

      return {
        order: orderDto,
        user: userDto,
        menu: menuDto,
      };
    });

    return newFindOrderDto;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<string> {
    await this.orders.update({
      where: { id },
      data: {
        order_state: updateOrderDto.orderState,
        is_paid: updateOrderDto.isPaid,
      },
    });

    return 'Order updated successfully!';
  }

  async remove(id: string): Promise<string> {
    await this.orders.delete({
      where: { id },
    });

    return 'Order removed successfully!';
  }
}
