import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class PaymentService {
  private client = new MercadoPagoConfig({
    accessToken: process.env.PAYMENT_ACCESS_TOKEN,
  });
  private payment = new Payment(this.client);

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const paymentResponse = await this.payment.create({
        body: {
          ...createPaymentDto,
        },
      });

      return paymentResponse;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number) {
    try {
      const payment = await this.payment.get({ id: id.toString() });

      return payment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
