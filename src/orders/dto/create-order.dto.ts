import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum PaymentType {
  MONEY = 'money',
  PIX = 'pix',
  DEBIT = 'debit',
  CREDIT = 'credit',
}

enum OrderState {
  CREATED = 'created',
}

export class Orders {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  menuId: string;

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  @IsEnum(PaymentType)
  paymentType: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  paymentId: number;

  quantity: number;

  @ApiProperty({ type: 'boolean' })
  @IsNotEmpty()
  @IsBoolean()
  delivery: boolean;

  @ApiProperty({ type: 'string' })
  @IsString()
  observations: string;

  isPaid: boolean;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderState)
  orderState: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  menuId: string;

  @ApiProperty({ type: [Orders] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Orders)
  orders: Orders[];
}
