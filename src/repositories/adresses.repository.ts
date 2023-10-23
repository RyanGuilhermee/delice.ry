import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAdressDto } from '../adresses/dto/create-adress.dto';
import { FindAdressDto } from '../adresses/dto/find-adress.dto';
import { UpdateAdressDto } from '../adresses/dto/update-adress.dto';

export interface IAdressesRepository {
  create(createUserDto: CreateAdressDto): Promise<FindAdressDto>;

  findOne(id: string): Promise<FindAdressDto | null>;

  findAll(id: string): Promise<FindAdressDto[]>;

  update(id: string, updateUserDto: UpdateAdressDto): Promise<string>;

  remove(id: string): Promise<string>;
}

@Injectable()
export class AdressesRepository
  extends PrismaClient
  implements IAdressesRepository
{
  async create(createAdressDto: CreateAdressDto): Promise<FindAdressDto> {
    const adress = await this.adresses.create({
      data: {
        street: createAdressDto.street,
        number: createAdressDto.number,
        user_id: createAdressDto.userId,
      },
    });

    const adressDto = new FindAdressDto();
    adressDto.id = adress.id;
    adressDto.street = adress.street;
    adressDto.number = adress.number;

    return adressDto;
  }

  async findOne(id: string): Promise<FindAdressDto | null> {
    const adress = await this.adresses.findFirst({
      where: { id },
    });

    if (!adress) {
      return null;
    }

    const adressDto = new FindAdressDto();
    adressDto.id = adress.id;
    adressDto.street = adress.street;
    adressDto.number = adress.number;

    return adressDto;
  }

  async findAll(userId: string): Promise<FindAdressDto[]> {
    const adresses = await this.adresses.findMany({
      where: { user_id: userId },
    });

    const newAdressesDto = adresses.map((adress) => {
      const adressDto = new FindAdressDto();
      adressDto.id = adress.id;
      adressDto.street = adress.street;
      adressDto.number = adress.number;

      return adressDto;
    });

    return newAdressesDto;
  }

  async update(id: string, updateAdressDto: UpdateAdressDto): Promise<string> {
    await this.adresses.update({
      where: { id },
      data: {
        street: updateAdressDto.street,
        number: updateAdressDto.number,
      },
    });

    return 'Adress updated successfully!';
  }

  async remove(id: string): Promise<string> {
    await this.adresses.delete({
      where: { id },
    });

    return 'Adress removed successfully!';
  }
}
