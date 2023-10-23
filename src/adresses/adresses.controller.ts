import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { CreateAdressResponse } from './response_types/create-adress.response';
import { FindAllAdressesResponse } from './response_types/findall-adress.response';
import { FindAdressResponse } from './response_types/find-adress.response';
import { UpdateAdressResponse } from './response_types/update-adress.response';
import { RemoveAdressResponse } from './response_types/remove-adress.response';

@Controller('api/adresses')
export class AdressesController {
  constructor(private readonly adressesService: AdressesService) {}

  @ApiResponse({ status: 201, type: CreateAdressResponse })
  @Roles('admin, everyone')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createAdressDto: CreateAdressDto) {
    const adress = await this.adressesService.create(createAdressDto);

    return {
      statusCode: 201,
      adress,
    };
  }

  @ApiResponse({ status: 200, type: FindAllAdressesResponse })
  @Roles('admin, everyone')
  @UseGuards(AuthGuard)
  @Get('user/:userId')
  async findAll(@Param('userId') userId: string) {
    const adresses = await this.adressesService.findAll(userId);

    return {
      statusCode: 200,
      adresses,
    };
  }

  @ApiResponse({ status: 200, type: FindAdressResponse })
  @Roles('admin, everyone')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const adress = await this.adressesService.findOne(id);

    return {
      statusCode: 200,
      adress,
    };
  }

  @ApiResponse({ status: 200, type: UpdateAdressResponse })
  @Roles('admin, everyone')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdressDto: UpdateAdressDto,
  ) {
    const message = await this.adressesService.update(id, updateAdressDto);

    return {
      statusCode: 200,
      message,
    };
  }

  @ApiResponse({ status: 200, type: RemoveAdressResponse })
  @Roles('admin, everyone')
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const message = await this.adressesService.remove(id);

    return {
      statusCode: 200,
      message,
    };
  }
}
