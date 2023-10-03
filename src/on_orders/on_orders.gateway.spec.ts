import { Test, TestingModule } from '@nestjs/testing';
import { OnOrdersGateway } from './on_orders.gateway';
import { OnOrdersService } from './on_orders.service';

describe('OnOrdersGateway', () => {
  let gateway: OnOrdersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnOrdersGateway, OnOrdersService],
    }).compile();

    gateway = module.get<OnOrdersGateway>(OnOrdersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
