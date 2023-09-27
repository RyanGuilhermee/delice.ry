import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindAllOrderDto } from './dto/findall-order.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles('admin', 'everyone')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);

    return {
      statusCode: 201,
      order,
    };
  }

  @Roles('admin', 'everyone')
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() findAllOrderDto: FindAllOrderDto) {
    const orders = await this.ordersService.findAll(findAllOrderDto);

    return {
      statusCode: 200,
      orders,
    };
  }

  @Roles('admin', 'everyone')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);

    return {
      statusCode: 200,
      ...order,
    };
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const response = await this.ordersService.update(id, updateOrderDto);

    return {
      statusCode: 200,
      message: response,
    };
  }

  @Roles('admin', 'everyone')
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.ordersService.remove(id);

    return {
      statusCode: 200,
      message: response,
    };
  }
}
