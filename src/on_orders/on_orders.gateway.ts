import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { OnOrdersService } from './on_orders.service';
import { CreateOnOrderDto } from './dto/create-on_order.dto';
import { UpdateOnOrderDto } from './dto/update-on_order.dto';

@WebSocketGateway()
export class OnOrdersGateway {
  constructor(private readonly onOrdersService: OnOrdersService) {}

  @SubscribeMessage('createOnOrder')
  create(@MessageBody() createOnOrderDto: CreateOnOrderDto) {
    return this.onOrdersService.create(createOnOrderDto);
  }

  @SubscribeMessage('findAllOnOrders')
  findAll() {
    return this.onOrdersService.findAll();
  }

  @SubscribeMessage('findOneOnOrder')
  findOne(@MessageBody() id: number) {
    return this.onOrdersService.findOne(id);
  }

  @SubscribeMessage('updateOnOrder')
  update(@MessageBody() updateOnOrderDto: UpdateOnOrderDto) {
    return this.onOrdersService.update(updateOnOrderDto.id, updateOnOrderDto);
  }

  @SubscribeMessage('removeOnOrder')
  remove(@MessageBody() id: number) {
    return this.onOrdersService.remove(id);
  }
}
