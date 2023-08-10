import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {
  IMenuRepository,
  MenuRepository,
} from '../repositories/menu.repository';
import { FindAllMenuDto } from './dto/findall-menu.dto';

@Injectable()
export class MenuService implements IMenuRepository {
  constructor(private menuRepository: MenuRepository) {}

  async create(createMenuDto: CreateMenuDto) {
    const menu = await this.findByName(createMenuDto.name);

    if (menu) {
      throw new HttpException('Item already exists', HttpStatus.BAD_REQUEST);
    }

    return this.menuRepository.create(createMenuDto);
  }

  async findAll(findAllMenuDto: FindAllMenuDto) {
    if (
      findAllMenuDto.category !== 'food' &&
      findAllMenuDto.category !== 'drink'
    ) {
      findAllMenuDto.category = '';
    }

    if (!findAllMenuDto.quantity || isNaN(Number(findAllMenuDto.quantity))) {
      findAllMenuDto.quantity = '10';
    }

    if (!findAllMenuDto.page || isNaN(Number(findAllMenuDto.page))) {
      findAllMenuDto.page = '1';
    }

    const menus = await this.menuRepository.findAll(findAllMenuDto);

    return menus;
  }

  findAllByNameWithContains(name: string) {
    return this.menuRepository.findAllByNameWithContains(name);
  }

  findOne(id: string) {
    return this.menuRepository.findOne(id);
  }

  findByName(name: string) {
    return this.menuRepository.findByName(name);
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findByName(updateMenuDto.name);

    if (menu) {
      throw new HttpException(
        'Item name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.menuRepository.update(id, updateMenuDto);
  }

  remove(id: string) {
    return this.menuRepository.remove(id);
  }
}
