import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { OnOrdersModule } from './on_orders/on_orders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    MenuModule,
    OrdersModule,
    OnOrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
