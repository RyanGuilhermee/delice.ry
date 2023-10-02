import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from '../repositories/menu.repository';
import { AuthGuard } from '../auth/guards/auth.guard';
import { OrdersService } from '../orders/orders.service';
import { OrdersRepository } from '../repositories/orders.repostory';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../repositories/users.repository';

@Module({
  controllers: [MenuController],
  providers: [
    MenuService,
    MenuRepository,
    AuthGuard,
    UsersService,
    UsersRepository,
    OrdersService,
    OrdersRepository,
  ],
})
export class MenuModule {}
