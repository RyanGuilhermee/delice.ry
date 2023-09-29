import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderResponse {
  @ApiProperty({ type: 'number', default: 200 })
  statusCode: number;

  @ApiProperty({ type: 'string' })
  message: string;
}
