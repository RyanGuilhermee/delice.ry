import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return this.adressedRepository.findOne(id);
  }

  update(id: string, updateAdressDto: UpdateAdressDto) {
    return this.adressedRepository.update(id, updateAdressDto);
  }

  remove(id: string) {
    return this.adressedRepository.remove(id);
  }
}
