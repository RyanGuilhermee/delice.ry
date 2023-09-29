import { ApiProperty } from '@nestjs/swagger';
import { FindOrderDto } from '../dto/find-order.dto';

export class CreateOrderResponse {
  @ApiProperty({ type: 'number', default: 201 })
  statusCode: number;

  @ApiProperty({ type: FindOrderDto })
  order: FindOrderDto;
}
