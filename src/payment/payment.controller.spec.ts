import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';

describe('PaymentController', () => {
  let controller: PaymentController;
  let paymentService: DeepMocked<PaymentService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<PaymentController>(PaymentController);
    paymentService = module.get(PaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a payment', async () => {
      const paymentResponse = {
        status: 'approved',
        api_response: { headers: ['', []], status: 200 },
        id: 123,
      } as PaymentResponse;

      paymentService.createPayment.mockResolvedValueOnce(paymentResponse);

      await expect(controller.create(new CreatePaymentDto())).resolves.toEqual({
        statusCode: 201,
        paymentId: paymentResponse.id,
        message: 'Payment successfully created',
      });
    });
  });
});
