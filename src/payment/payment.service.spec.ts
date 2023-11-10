import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentRepository } from '../repositories/payment.repository';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: DeepMocked<PaymentRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get(PaymentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a payment', async () => {
      paymentRepository.createPayment.mockResolvedValueOnce({
        status: 'approved',
        api_response: { headers: ['', []], status: 200 },
      });

      await expect(
        service.createPayment(new CreatePaymentDto()),
      ).resolves.toEqual({
        status: 'approved',
        api_response: { headers: ['', []], status: 200 },
      });
    });
  });

  describe('findPayment', () => {
    it('should successfully find a payment', async () => {
      paymentRepository.findPayment.mockResolvedValueOnce({
        status: 'approved',
        api_response: { headers: ['', []], status: 200 },
      });

      await expect(service.findPayment(1)).resolves.toEqual({
        status: 'approved',
        api_response: { headers: ['', []], status: 200 },
      });
    });
  });
});
