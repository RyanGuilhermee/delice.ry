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
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateOrderResponse } from './response_types/create-order.response';
import { FindAllOrderResponse } from './response_types/findall-order.response';
import { FindOrderResponse } from './response_types/find-order.response';
import { UpdateOrderResponse } from './response_types/update-order.response';
import { RemoveOrderResponse } from './response_types/remove-order.response';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiResponse({ status: 201, type: CreateOrderResponse })
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

  @ApiQuery({
    name: 'page',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'quantity',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'orderState',
    type: String,
    enum: ['created', 'confirmed', 'preparing', 'delivering', 'done'],
    required: true,
  })
  @ApiResponse({ status: 200, type: FindAllOrderResponse })
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

  @ApiResponse({ status: 200, type: FindOrderResponse })
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

  @ApiResponse({ status: 200, type: UpdateOrderResponse })
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

  @ApiResponse({ status: 200, type: RemoveOrderResponse })
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
