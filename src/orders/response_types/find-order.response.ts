import { ApiProperty } from '@nestjs/swagger';
import { FindOrderDto } from '../dto/find-order.dto';

export class FindOrderResponse {
  @ApiProperty({ type: 'number', default: 200 })
  statusCode: number;

  @ApiProperty({ type: [FindOrderDto] })
  order: FindOrderDto;
}
