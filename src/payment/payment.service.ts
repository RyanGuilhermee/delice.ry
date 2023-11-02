import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {
  IPaymentRepository,
  PaymentRepository,
} from '../repositories/payment.repository';

@Injectable()
export class PaymentService implements IPaymentRepository {
  constructor(private paymentRepository: PaymentRepository) {}

  createPayment(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepository.createPayment(createPaymentDto);
  }

  findPayment(id: number) {
    return this.paymentRepository.findPayment(id);
  }
}
