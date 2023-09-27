import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsString, IsEnum, IsBoolean } from 'class-validator';

enum OrderState {
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  DELIVERING = 'delivering',
  DONE = 'done',
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderState)
  orderState: string;

  @IsBoolean()
  isPaid: boolean;
}
