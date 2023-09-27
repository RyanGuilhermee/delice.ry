import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  IsEnum,
} from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  @IsEnum(PaymentType)
  paymentType: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsBoolean()
  delivery: boolean;

  @IsString()
  observations: string;

  @IsNotEmpty()
  @IsBoolean()
  isPaid: boolean;

  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderState)
  orderState: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  menuId: string;
}
