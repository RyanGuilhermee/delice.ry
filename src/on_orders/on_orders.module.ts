import { Module } from '@nestjs/common';
import { OnOrdersService } from './on_orders.service';
import { OnOrdersGateway } from './on_orders.gateway';

@Module({
  providers: [OnOrdersGateway, OnOrdersService],
})
export class OnOrdersModule {}
