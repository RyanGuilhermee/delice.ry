import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { MenuRepository } from '../repositories/menu.repository';
import { OrdersService } from '../orders/orders.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { FindMenuDto } from './dto/find-menu.dto';
import { BadRequestException, HttpException } from '@nestjs/common';
import { FindAllMenuDto } from './dto/findall-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

describe('MenuService', () => {
  let service: MenuService;
  let menuRepository: DeepMocked<MenuRepository>;
  let ordersService: DeepMocked<OrdersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<MenuService>(MenuService);
    menuRepository = module.get(MenuRepository);
    ordersService = module.get(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a menu', async () => {
      const newMenu = new CreateMenuDto();
      newMenu.name = 'Menu test';
      newMenu.price = 10.0;
      newMenu.category = 'food';
      newMenu.description = '';
      newMenu.available = true;
      newMenu.image = 'https://someimg.jpg';

      const menu = new FindMenuDto();
      menu.id = '123';
      menu.name = 'Menu test';
      menu.price = 10.0;
      menu.category = 'food';
      menu.description = '';
      menu.available = true;
      menu.image = 'https://someimg.jpg';

      menuRepository.findByName.mockResolvedValueOnce(null);

      menuRepository.create.mockResolvedValueOnce(menu);

      await expect(service.create(newMenu)).resolves.toBe(menu);
    });

    it('should throw an exception if a menu exists', async () => {
      const newMenu = new CreateMenuDto();
      newMenu.name = 'Menu test';
      newMenu.price = 10.0;
      newMenu.category = 'food';
      newMenu.description = '';
      newMenu.available = true;
      newMenu.image = 'https://someimg.jpg';

      const menu = new FindMenuDto();
      menu.id = '123';
      menu.name = 'Menu test';
      menu.price = 10.0;
      menu.category = 'food';
      menu.description = '';
      menu.available = true;
      menu.image = 'https://someimg.jpg';

      menuRepository.findByName.mockResolvedValueOnce(menu);

      await expect(service.create(newMenu)).rejects.toBeInstanceOf(
        HttpException,
      );

      await expect(service.create(newMenu)).rejects.toThrow(
        'Item already exists',
      );
    });
  });

  describe('findAll', () => {
    it('should successfully find all menus', async () => {
      const findAllDto = new FindAllMenuDto();

      const menu = new FindMenuDto();
      menu.id = '123';
      menu.name = 'Menu test';
      menu.price = 10.0;
      menu.category = 'food';
      menu.description = '';
      menu.available = true;
      menu.image = 'https://someimg.jpg';

      const menu2 = new FindMenuDto();
      menu2.id = '1234';
      menu2.name = 'Menu2 test';
      menu2.price = 12.0;
      menu2.category = 'drink';
      menu2.description = '';
      menu2.available = true;
      menu2.image = 'https://someimg.jpg';

      menuRepository.findAll.mockResolvedValueOnce([menu, menu2]);

      await expect(service.findAll(findAllDto)).resolves.toStrictEqual([
        menu,
        menu2,
      ]);
    });

    it('should verify iwhen the category is diferent of "food" and "drink", then assign empty string to the category property', async () => {
      const findAllDto = new FindAllMenuDto();
      findAllDto.category = 'non-existent_category';

      menuRepository.findAll.mockResolvedValue([]);

      await expect(service.findAll(findAllDto)).resolves.toStrictEqual([]);

      expect(findAllDto.category).toBe('');
    });

    it('should verify when the quantity is empty, then assign "10" as default value', async () => {
      const findAllDto = new FindAllMenuDto();
      findAllDto.quantity = '';

      menuRepository.findAll.mockResolvedValue([]);

      await expect(service.findAll(findAllDto)).resolves.toStrictEqual([]);

      expect(findAllDto.quantity).toBe('10');
    });

    it('should verify when the quantity is NaN, then assign "10" as default value', async () => {
      const findAllDto = new FindAllMenuDto();
      findAllDto.quantity = 'NaN';

      menuRepository.findAll.mockResolvedValue([]);

      await expect(service.findAll(findAllDto)).resolves.toStrictEqual([]);

      expect(findAllDto.quantity).toBe('10');
    });

    it('should verify when the page is empty, then assign "1" as default value', async () => {
      const findAllDto = new FindAllMenuDto();
      findAllDto.page = '';

      menuRepository.findAll.mockResolvedValue([]);

      await expect(service.findAll(findAllDto)).resolves.toStrictEqual([]);

      expect(findAllDto.page).toBe('1');
    });

    it('should verify when the page is NaN, then assign "1" as default value', async () => {
      const findAllDto = new FindAllMenuDto();
      findAllDto.page = 'NaN';

      menuRepository.findAll.mockResolvedValue([]);

      await expect(service.findAll(findAllDto)).resolves.toStrictEqual([]);

      expect(findAllDto.page).toBe('1');
    });
  });

  describe('findOne', () => {
    it('should successfully find a menu', async () => {
      const id = '123';

      const menu = new FindMenuDto();
      menu.id = '123';
      menu.name = 'Menu test';
      menu.price = 10.0;
      menu.category = 'food';
      menu.description = '';
      menu.available = true;
      menu.image = 'https://someimg.jpg';

      menuRepository.findOne.mockResolvedValueOnce(menu);

      await expect(service.findOne(id)).resolves.toBe(menu);
    });

    it('should throw an exception if a menu was not found', async () => {
      const id = '1';

      menuRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toBeInstanceOf(HttpException);

      await expect(service.findOne(id)).rejects.toThrow('Menu not found');
    });
  });

  describe('findByName', () => {
    it('should successfully find a menu by name', async () => {
      const menuName = 'Menu test';

      const menu = new FindMenuDto();
      menu.id = '123';
      menu.name = 'Menu test';
      menu.price = 10.0;
      menu.category = 'food';
      menu.description = '';
      menu.available = true;
      menu.image = 'https://someimg.jpg';

      menuRepository.findByName.mockResolvedValueOnce(menu);

      await expect(service.findByName(menuName)).resolves.toBe(menu);
    });
  });

  describe('update', () => {
    it('should successfully update a menu', async () => {
      const id = '123';

      const menu = new FindMenuDto();
      menu.id = '123';
      menu.name = 'Menu test';
      menu.price = 10.0;
      menu.category = 'food';
      menu.description = '';
      menu.available = true;
      menu.image = 'https://someimg.jpg';

      const updateMenu = new UpdateMenuDto();
      updateMenu.name = 'menu2';

      menuRepository.findOne.mockResolvedValue(menu);

      menuRepository.findByName.mockResolvedValue(null);

      menuRepository.update.mockResolvedValue('Item updated successfully!');

      await expect(service.update(id, updateMenu)).resolves.toBe(
        'Item updated successfully!',
      );
    });

    it('should throw an exception if the menu name exists', async () => {
      const id = '123';

      const menu = new FindMenuDto();
      menu.id = '123';
      menu.name = 'Menu test';
      menu.price = 10.0;
      menu.category = 'food';
      menu.description = '';
      menu.available = true;
      menu.image = 'https://someimg.jpg';

      const updateMenu = new UpdateMenuDto();
      updateMenu.name = 'menu2';

      menuRepository.findOne.mockResolvedValue(menu);

      menuRepository.findByName.mockResolvedValue(menu);

      await expect(service.update(id, updateMenu)).rejects.toBeInstanceOf(
        HttpException,
      );

      await expect(service.update(id, updateMenu)).rejects.toThrow(
        'Item name already exists',
      );
    });
  });

  describe('remove', () => {
    it('should successfully remove a menu', async () => {
      const id = '123';

      ordersService.orderHasMenuId.mockResolvedValueOnce(false);

      menuRepository.remove.mockResolvedValueOnce('Item removed successfully!');

      await expect(service.remove(id)).resolves.toBe(
        'Item removed successfully!',
      );
    });

    it('should throw an exception if a menu has a record relating to an order', async () => {
      const id = '123';

      ordersService.orderHasMenuId.mockResolvedValueOnce(true);

      await expect(service.remove(id)).rejects.toBeInstanceOf(
        BadRequestException,
      );

      await expect(service.remove(id)).rejects.toThrow(
        'Unable to remove menu because there are currently active orders',
      );
    });
  });
});
