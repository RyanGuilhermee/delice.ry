import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../repositories/users.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { OrdersService } from '../orders/orders.service';
import { OrdersRepository } from '../repositories/orders.repostory';
import { MenuService } from '../menu/menu.service';
import { MenuRepository } from '../repositories/menu.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersRepository,
    OrdersService,
    OrdersRepository,
    MenuService,
    MenuRepository,
    JwtService,
  ],
})
export class AuthModule {}
