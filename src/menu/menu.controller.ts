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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { FindAllMenuDto } from './dto/findall-menu.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateMenuResponse } from './response_types/create-menu.response';
import { FindMenuResponse } from './response_types/find-menu.response';
import { UpdateMenuResponse } from './response_types/update-menu.response';
import { RemoveMenuResponse } from './response_types/remove-menu.response';
import { FindAllMenuResponse } from './response_types/findall-menu.response';

@Controller('api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiResponse({ status: 201, type: CreateMenuResponse })
  @Roles('admin')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    const menu = await this.menuService.create(createMenuDto);

    return {
      statusCode: 201,
      menu,
    };
  }

  @ApiQuery({
    name: 'category',
    type: String,
    enum: ['food', 'drink'],
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: String,
    example: '1',
    required: false,
  })
  @ApiQuery({
    name: 'quantity',
    type: String,
    example: '5',
    required: false,
  })
  @ApiResponse({ status: 200, type: FindAllMenuResponse })
  @Roles('admin, everyone')
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() findAllMenuDto: FindAllMenuDto) {
    const menus = await this.menuService.findAll(findAllMenuDto);

    return {
      statusCode: 200,
      menus,
    };
  }

  @ApiResponse({ status: 200, type: FindMenuResponse })
  @Roles('admin, everyone')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const menu = await this.menuService.findOne(id);

    return {
      statusCode: 200,
      menu,
    };
  }

  @ApiResponse({ status: 200, type: UpdateMenuResponse })
  @Roles('admin')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const response = await this.menuService.update(id, updateMenuDto);

    return {
      statusCode: 200,
      message: response,
    };
  }

  @ApiResponse({ status: 200, type: RemoveMenuResponse })
  @Roles('admin')
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.menuService.remove(id);

    return {
      statusCode: 200,
      message: response,
    };
  }
}
