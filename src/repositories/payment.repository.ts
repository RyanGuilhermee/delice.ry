import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../payment/dto/create-payment.dto';
import MercadoPagoConfig, { Payment } from 'mercadopago';
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';

export interface IPaymentRepository {
  createPayment(createPaymentDto: CreatePaymentDto): Promise<PaymentResponse>;

  findPayment(id: number): Promise<PaymentResponse>;
}

@Injectable()
export class PaymentRepository extends Payment implements IPaymentRepository {
  constructor() {
    super(
      new MercadoPagoConfig({
        accessToken: process.env.PAYMENT_ACCESS_TOKEN,
      }),
    );
  }

  async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentResponse> {
    try {
      const paymentResponse = await this.create({
        body: {
          ...createPaymentDto,
        },
      });

      return paymentResponse;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findPayment(id: number): Promise<PaymentResponse> {
    try {
      const payment = await this.get({ id: id.toString() });

      return payment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
