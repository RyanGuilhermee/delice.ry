import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMenuDto } from '../menu/dto/create-menu.dto';
import { FindMenuDto } from '../menu/dto/find-menu.dto';
import { UpdateMenuDto } from '../menu/dto/update-menu.dto';

export interface IMenuRepository {
  create(createMenuDto: CreateMenuDto): Promise<FindMenuDto>;

  findOne(id: string): Promise<FindMenuDto | null>;

  findByName(name: string): Promise<FindMenuDto | null>;

  update(id: string, updateMenuDto: UpdateMenuDto): Promise<string>;

  remove(id: string): Promise<string>;
}

@Injectable()
export class MenuRepository extends PrismaClient implements IMenuRepository {
  async create(createMenuDto: CreateMenuDto): Promise<FindMenuDto> {
    const menu = await this.menu.create({
      data: {
        category: createMenuDto.category,
        name: createMenuDto.name,
        price: createMenuDto.price,
        description: createMenuDto.description,
        image: createMenuDto.image,
        available: createMenuDto.available,
      },
    });

    const menuDto = new FindMenuDto();
    menuDto.category = menu.category;
    menuDto.name = menu.name;
    menuDto.price = Number(menu.price);
    menuDto.description = menu.description;
    menuDto.image = menu.image;
    menuDto.available = menu.available;

    return menuDto;
  }

  async findOne(id: string): Promise<FindMenuDto | null> {
    const menu = await this.menu.findFirst({
      where: { id },
    });

    if (!menu) {
      return null;
    }

    const menuDto = new FindMenuDto();
    menuDto.category = menu.category;
    menuDto.name = menu.name;
    menuDto.price = Number(menu.price);
    menuDto.description = menu.description;
    menuDto.image = menu.image;
    menuDto.available = menu.available;

    return menuDto;
  }

  async findByName(name: string): Promise<FindMenuDto | null> {
    const menu = await this.menu.findFirst({
      where: { name },
    });

    if (!menu) {
      return null;
    }

    const menuDto = new FindMenuDto();
    menuDto.category = menu.category;
    menuDto.name = menu.name;
    menuDto.price = Number(menu.price);
    menuDto.description = menu.description;
    menuDto.image = menu.image;
    menuDto.available = menu.available;

    return menuDto;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<string> {
    await this.menu.update({
      where: { id },
      data: {
        category: updateMenuDto.category,
        name: updateMenuDto.name,
        price: updateMenuDto.price,
        description: updateMenuDto.description,
        image: updateMenuDto.image,
        available: updateMenuDto.available,
      },
    });

    return 'Menu updated successfully!';
  }

  async remove(id: string): Promise<string> {
    await this.menu.delete({
      where: { id },
    });

    return 'Menu removed successfully!';
  }
}
