import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CreateMenuDto } from './dto/create-menu.dto';
import { FindMenuDto } from './dto/find-menu.dto';
import { FindAllMenuDto } from './dto/findall-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

describe('MenuController', () => {
  let controller: MenuController;
  let menuService: DeepMocked<MenuService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<MenuController>(MenuController);
    menuService = module.get(MenuService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      menuService.create.mockResolvedValueOnce(menu);

      await expect(controller.create(newMenu)).resolves.toEqual({
        statusCode: 201,
        menu,
      });
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

      menuService.findAll.mockResolvedValueOnce([menu, menu2]);

      await expect(controller.findAll(findAllDto)).resolves.toEqual({
        statusCode: 200,
        menus: [menu, menu2],
      });
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

      menuService.findOne.mockResolvedValueOnce(menu);

      await expect(controller.findOne(id)).resolves.toEqual({
        statusCode: 200,
        menu,
      });
    });
  });

  describe('update', () => {
    it('should successfully update a menu', async () => {
      const id = '123';

      const menuUpdate = new UpdateMenuDto();
      menuUpdate.price = 13.0;

      menuService.update.mockResolvedValueOnce('Item updated successfully!');

      await expect(controller.update(id, menuUpdate)).resolves.toEqual({
        statusCode: 200,
        message: 'Item updated successfully!',
      });
    });
  });

  describe('remove', () => {
    it('should successfully remove a menu', async () => {
      const id = '123';

      menuService.remove.mockResolvedValueOnce('Item removed successfully!');

      await expect(controller.remove(id)).resolves.toEqual({
        statusCode: 200,
        message: 'Item removed successfully!',
      });
    });
  });
});
