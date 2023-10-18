import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentResponse {
  @ApiProperty({ type: 'number', default: 201 })
  statusCode: number;

  @ApiProperty({ type: 'number' })
  paymentId: number;
}
