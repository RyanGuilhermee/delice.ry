import { ApiProperty } from '@nestjs/swagger';
import { FindOrderDto } from '../dto/find-order.dto';

export class FindAllOrderResponse {
  @ApiProperty({ type: 'number', default: 200 })
  statusCode: number;

  @ApiProperty({ type: [FindOrderDto] })
  orders: FindOrderDto[];
}
