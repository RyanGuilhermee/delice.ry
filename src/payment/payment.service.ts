import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findOne(id: string) {
    return `This action returns a #${id} payment`;
  }
}
