import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentType {
  MONEY = 'money',
  PIX = 'pix',
  DEBIT = 'debit',
  CREDIT = 'credit',
}

enum OrderState {
  CREATED = 'created',
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

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ type: 'boolean' })
  @IsNotEmpty()
  @IsBoolean()
  delivery: boolean;

  @ApiProperty({ type: 'string' })
  @IsString()
  observations: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderState)
  orderState: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  menuId: string;
}
