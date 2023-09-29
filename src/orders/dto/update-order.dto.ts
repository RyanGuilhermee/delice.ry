import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsString, IsEnum, IsBoolean } from 'class-validator';

enum OrderState {
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  DELIVERING = 'delivering',
  DONE = 'done',
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    type: 'string',
    enum: ['confirmed', 'preparing', 'delivering', 'done'],
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderState)
  orderState: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  isPaid: boolean;
}
