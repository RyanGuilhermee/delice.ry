import { Test, TestingModule } from '@nestjs/testing';
import { AdressesController } from './adresses.controller';
import { AdressesService } from './adresses.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CreateAdressDto } from './dto/create-adress.dto';
import { FindAdressDto } from './dto/find-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';

describe('AdressesController', () => {
  let controller: AdressesController;
  let adressesService: DeepMocked<AdressesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdressesController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<AdressesController>(AdressesController);
    adressesService = module.get(AdressesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create an adress', async () => {
      const adress = {
        id: '123',
        street: 'some street',
        number: 10,
      } as FindAdressDto;

      adressesService.create.mockResolvedValueOnce(adress);

      await expect(controller.create(new CreateAdressDto())).resolves.toEqual({
        statusCode: 201,
        adress,
      });
    });
  });

  describe('findAll', () => {
    it('should successfully find all adresses', async () => {
      adressesService.findAll.mockResolvedValueOnce([]);

      await expect(controller.findAll('123')).resolves.toEqual({
        statusCode: 200,
        adresses: [],
      });
    });
  });

  describe('findOne', () => {
    it('should successfully find an adress', async () => {
      const adress = {
        id: '123',
        street: 'some street',
        number: 10,
      } as FindAdressDto;

      adressesService.findOne.mockResolvedValueOnce(adress);

      await expect(controller.findOne('123')).resolves.toEqual({
        statusCode: 200,
        adress,
      });
    });
  });

  describe('update', () => {
    it('should successfully update an adress', async () => {
      adressesService.update.mockResolvedValueOnce(
        'Adress updated successfully!',
      );

      await expect(
        controller.update('123', new UpdateAdressDto()),
      ).resolves.toEqual({
        statusCode: 200,
        message: 'Adress updated successfully!',
      });
    });
  });

  describe('remove', () => {
    it('should successfully remove an adress', async () => {
      adressesService.remove.mockResolvedValueOnce(
        'Adress removed successfully!',
      );

      await expect(controller.remove('123')).resolves.toEqual({
        statusCode: 200,
        message: 'Adress removed successfully!',
      });
    });
  });
});
