import { Test, TestingModule } from '@nestjs/testing';
import { AdressesService } from './adresses.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { AdressesRepository } from '../repositories/adresses.repository';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { NotFoundException } from '@nestjs/common';

describe('AdressesService', () => {
  let service: AdressesService;
  let adressesRepository: DeepMocked<AdressesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdressesService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<AdressesService>(AdressesService);
    adressesRepository = module.get(AdressesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create an adress', async () => {
      adressesRepository.create.mockResolvedValueOnce({
        id: '123',
        street: 'some street',
        number: 10,
      });

      await expect(service.create(new CreateAdressDto())).resolves.toEqual({
        id: '123',
        street: 'some street',
        number: 10,
      });
    });
  });

  describe('findAll', () => {
    it('should successfully find all adresses', async () => {
      adressesRepository.findAll.mockResolvedValueOnce([]);

      await expect(service.findAll('123')).resolves.toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should successfully find an adress', async () => {
      adressesRepository.findOne.mockResolvedValueOnce({
        id: '123',
        street: 'some street',
        number: 10,
      });

      await expect(service.findOne('123')).resolves.toEqual({
        id: '123',
        street: 'some street',
        number: 10,
      });
    });

    it('should throw an exception if an adress was not found', async () => {
      adressesRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toBeInstanceOf(
        NotFoundException,
      );

      await expect(service.findOne('1')).rejects.toThrow('Adress not found');
    });
  });

  describe('update', () => {
    it('should successfully update an adress', async () => {
      adressesRepository.update.mockResolvedValueOnce(
        'Adress updated successfully!',
      );

      await expect(service.update('123', new UpdateAdressDto())).resolves.toBe(
        'Adress updated successfully!',
      );
    });
  });

  describe('remove', () => {
    it('should successfully remove an adress', async () => {
      adressesRepository.remove.mockResolvedValueOnce(
        'Adress removed successfully!',
      );

      await expect(service.remove('123')).resolves.toBe(
        'Adress removed successfully!',
      );
    });
  });
});
