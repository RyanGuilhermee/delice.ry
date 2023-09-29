import { ApiProperty } from '@nestjs/swagger';

export class FindOrderDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  paymentType: string;

  @ApiProperty({ type: 'string' })
  quantity: number;

  @ApiProperty({ type: 'string' })
  delivery: boolean;

  @ApiProperty({ type: 'string' })
  observations: string;

  @ApiProperty({ type: 'string' })
  isPaid: boolean;

  @ApiProperty({ type: 'string' })
  orderState: string;

  @ApiProperty({ type: 'string' })
  date: Date;

  @ApiProperty({ type: 'string' })
  userId: string;

  @ApiProperty({ type: 'string' })
  menuId: string;
}
