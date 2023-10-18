import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from '../repositories/users.repository';
import { AuthGuard } from '../auth/guards/auth.guard';
import { OrdersService } from 'src/orders/orders.service';
import { OrdersRepository } from 'src/repositories/orders.repostory';
import { MenuService } from '../menu/menu.service';
import { MenuRepository } from '../repositories/menu.repository';
import { PaymentService } from '../payment/payment.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    AuthGuard,
    MenuService,
    MenuRepository,
    OrdersService,
    OrdersRepository,
    PaymentService,
  ],
})
export class UsersModule {}
