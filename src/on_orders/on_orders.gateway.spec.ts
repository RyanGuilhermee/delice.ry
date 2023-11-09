import { Test, TestingModule } from '@nestjs/testing';
import { OnOrdersGateway } from './on_orders.gateway';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Server, Socket } from 'socket.io';
import { Data } from './dto/data-on_order.dto';

describe('OnOrdersGateway', () => {
  let gateway: OnOrdersGateway;
  let client: DeepMocked<Socket>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnOrdersGateway],
    })
      .useMocker(createMock)
      .compile();

    gateway = module.get<OnOrdersGateway>(OnOrdersGateway);
    client = createMock();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('onAdminJoined', () => {
    it('should emit "joined" event with a payload', () => {
      gateway.onAdminJoined(client);

      expect(client.emit).toHaveBeenCalledWith('joined', {
        status: 200,
        message: 'admin joined',
      });
    });
  });

  describe('onCreated', () => {
    it('should emit "created" event with a payload', () => {
      const userId = '123';

      gateway.onCreated(userId, client);

      expect(client.to('some-client-id').emit).toHaveBeenCalledWith('created', {
        status: 200,
        clientId: client.id,
        userId,
        message: 'order created',
      });
    });
  });

  describe('onConfirmed', () => {
    it('should emit "confirmed" event with a payload', () => {
      gateway.onConfirmed(new Data(), client);

      expect(client.to('some-client-id').emit).toHaveBeenCalledWith(
        'confirmed',
        {
          status: 200,
          message: 'order confirmed',
        },
      );
    });
  });

  describe('onPreparing', () => {
    it('should emit "preparing" event with a payload', () => {
      gateway.onPreparing(new Data(), client);

      expect(client.to('some-client-id').emit).toHaveBeenCalledWith(
        'preparing',
        {
          status: 200,
          message: 'preparing order',
        },
      );
    });
  });

  describe('onAlready', () => {
    it('should emit "already" event with a payload', () => {
      gateway.onAlready(new Data(), client);

      expect(client.to('some-client-id').emit).toHaveBeenCalledWith('already', {
        status: 200,
        message: 'order is already',
      });
    });
  });

  describe('onDelivering', () => {
    it('should emit "delivering" event with a payload', () => {
      gateway.onDelivering(new Data(), client);

      expect(client.to('some-client-id').emit).toHaveBeenCalledWith(
        'delivering',
        {
          status: 200,
          message: 'delivering order',
        },
      );
    });
  });

  describe('onDone', () => {
    it('should emit "done" event with a payload', () => {
      gateway.onDone(new Data(), client);

      expect(client.to('some-client-id').emit).toHaveBeenCalledWith('done', {
        status: 200,
        message: 'order is done',
      });
    });
  });
});
