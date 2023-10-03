import { Injectable } from '@nestjs/common';
import { CreateOnOrderDto } from './dto/create-on_order.dto';
import { UpdateOnOrderDto } from './dto/update-on_order.dto';

@Injectable()
export class OnOrdersService {
  create(createOnOrderDto: CreateOnOrderDto) {
    return 'This action adds a new onOrder';
  }

  findAll() {
    return `This action returns all onOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} onOrder`;
  }

  update(id: number, updateOnOrderDto: UpdateOnOrderDto) {
    return `This action updates a #${id} onOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} onOrder`;
  }
}
