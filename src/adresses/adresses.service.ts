import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { AdressesRepository } from '../repositories/adresses.repository';

@Injectable()
export class AdressesService {
  constructor(private adressedRepository: AdressesRepository) {}

  create(createAdressDto: CreateAdressDto) {
    return this.adressedRepository.create(createAdressDto);
  }

  findAll(userId: string) {
    return this.adressedRepository.findAll(userId);
  }

  async findOne(id: string) {
    const adress = await this.adressedRepository.findOne(id);

    if (!adress) {
      throw new NotFoundException('Adress not found');
    }

    return adress;
  }

  async update(id: string, updateAdressDto: UpdateAdressDto) {
    await this.findOne(id);

    return this.adressedRepository.update(id, updateAdressDto);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.adressedRepository.remove(id);
  }
}
