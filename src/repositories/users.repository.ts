import { Injectable } from '@nestjs/common';
import { PrismaClient, Users } from '@prisma/client';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FindUserDto } from '../users/dto/find-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

export interface IUsersRepository {
  create(createUserDto: CreateUserDto): Promise<FindUserDto>;

  findOne(id: string): Promise<FindUserDto | null>;

  findOneByEmail(email: string): Promise<Users | null>;

  update(id: string, updateUserDto: UpdateUserDto): Promise<string>;

  remove(id: string): Promise<string>;
}

@Injectable()
export class UsersRepository extends PrismaClient implements IUsersRepository {
  async create(createUserDto: CreateUserDto): Promise<FindUserDto> {
    const user = await this.users.create({
      data: {
        ...createUserDto,
      },
    });

    const userDto = new FindUserDto();
    userDto.id = user.id;
    userDto.name = user.name;
    userDto.email = user.email;
    userDto.isAdmin = user.is_admin;

    return userDto;
  }

  async findOne(id: string): Promise<FindUserDto | null> {
    const user = await this.users.findFirst({
      where: { id },
    });

    if (!user) {
      return null;
    }

    const userDto = new FindUserDto();
    userDto.id = user.id;
    userDto.name = user.name;
    userDto.email = user.email;
    userDto.isAdmin = user.is_admin;

    return userDto;
  }

  async findOneByEmail(email: string): Promise<Users | null> {
    const user = await this.users.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    await this.users.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        password: updateUserDto.password,
      },
    });

    return 'User updated successfully!';
  }

  async remove(id: string): Promise<string> {
    await this.users.delete({
      where: { id },
    });

    return 'User removed successfully!';
  }
}
