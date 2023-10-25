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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserResponse } from './response_types/create-user.response';
import { FindUserResponse } from './response_types/find-user.response';
import { UpdateUserResponse } from './response_types/update-user.response';
import { RemoveUserResponse } from './response_types/remove-user.response';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 201, type: CreateUserResponse })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return {
      statusCode: 201,
      user: {
        ...user,
      },
    };
  }

  @ApiResponse({ status: 200, type: FindUserResponse })
  @Roles('admin', 'everyone')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    return {
      statusCode: 200,
      user: {
        ...user,
      },
    };
  }

  @ApiResponse({ status: 200, type: UpdateUserResponse })
  @Roles('admin', 'everyone')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const response = await this.usersService.update(id, updateUserDto);

    return {
      statusCode: 200,
      message: response,
    };
  }

  @ApiResponse({ status: 200, type: RemoveUserResponse })
  @Roles('admin', 'everyone')
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.usersService.remove(id);

    return {
      statusCode: 200,
      message: response,
    };
  }
}
