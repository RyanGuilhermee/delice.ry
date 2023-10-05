import { Module } from '@nestjs/common';
import { OnOrdersGateway } from './on_orders.gateway';

@Module({
  providers: [OnOrdersGateway],
})
export class OnOrdersModule {}
