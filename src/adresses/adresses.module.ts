import { Module } from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { AdressesController } from './adresses.controller';
import { AdressesRepository } from 'src/repositories/adresses.repository';

@Module({
  controllers: [AdressesController],
  providers: [AdressesService, AdressesRepository],
})
export class AdressesModule {}
