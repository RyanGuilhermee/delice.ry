import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class FindAllOrderDto {
  page: string;
  quantity: string;
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum({
    created: 'created',
    confirmed: 'confirmed',
    preparing: 'preparing',
    delivering: 'delivering',
    done: 'done',
  })
  orderState: string;
}
