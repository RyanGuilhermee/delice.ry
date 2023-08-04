import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const response = await this.usersService.update(id, updateUserDto);

    return {
      statusCode: 200,
      message: response,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.usersService.remove(id);

    return {
      statusCode: 200,
      message: response,
    };
  }
}
