import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { CreatePaymentResponse } from './response_type/create-payment.response';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiResponse({ status: 201, type: CreatePaymentResponse })
  @Roles('admin, everyone')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const paymentResponse = await this.paymentService.create(createPaymentDto);

    return {
      statusCode: 201,
      paymentId: paymentResponse.id,
      message: 'Payment successfully created',
    };
  }
}
