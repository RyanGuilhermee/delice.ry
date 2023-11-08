import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from '../repositories/orders.repostory';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../repositories/users.repository';
import { MenuService } from '../menu/menu.service';
import { MenuRepository } from '../repositories/menu.repository';
import { PaymentService } from '../payment/payment.service';
import { PaymentRepository } from '../repositories/payment.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    UsersService,
    UsersRepository,
    MenuService,
    MenuRepository,
    PaymentService,
    PaymentRepository,
  ],
})
export class OrdersModule {}
