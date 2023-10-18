import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Data } from './dto/data-on_order.dto';

@WebSocketGateway(3001, { cors: true })
export class OnOrdersGateway {
  @WebSocketServer()
  server: Server;
  adminClientId: string;

  @Roles('admin')
  @UseGuards(AuthGuard)
  @SubscribeMessage('join')
  onAdminJoined(@ConnectedSocket() client: Socket) {
    this.adminClientId = client.id;

    client.emit('joined', { status: 200, message: 'admin joined' });
  }

  @Roles('admin', 'everyone')
  @UseGuards(AuthGuard)
  @SubscribeMessage('created')
  onCreated(@MessageBody() orderId: string, @ConnectedSocket() client: Socket) {
    client.to(this.adminClientId).emit('created', {
      status: 200,
      clientId: client.id,
      orderId,
      message: 'order created',
    });
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @SubscribeMessage('confirmed')
  onConfirmed(@MessageBody() data: Data, @ConnectedSocket() client: Socket) {
    client
      .to(data.clientId)
      .emit('confirmed', { status: 200, message: 'order confirmed' });
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @SubscribeMessage('preparing')
  onPreparing(@MessageBody() data: Data, @ConnectedSocket() client: Socket) {
    client
      .to(data.clientId)
      .emit('preparing', { status: 200, message: 'preparing order' });
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @SubscribeMessage('already')
  onAlready(@MessageBody() data: Data, @ConnectedSocket() client: Socket) {
    client
      .to(data.clientId)
      .emit('everyone', { status: 200, message: 'order is already' });
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @SubscribeMessage('delivering')
  onDelivering(@MessageBody() data: Data, @ConnectedSocket() client: Socket) {
    client
      .to(data.clientId)
      .emit('delivering', { status: 200, message: 'delivering order' });
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @SubscribeMessage('done')
  onDone(@MessageBody() data: Data, @ConnectedSocket() client: Socket) {
    client
      .to(data.clientId)
      .emit('done', { status: 200, message: 'order is done' });
  }
}
