import { Test, TestingModule } from '@nestjs/testing';
import { OnOrdersService } from './on_orders.service';

describe('OnOrdersService', () => {
  let service: OnOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnOrdersService],
    }).compile();

    service = module.get<OnOrdersService>(OnOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
