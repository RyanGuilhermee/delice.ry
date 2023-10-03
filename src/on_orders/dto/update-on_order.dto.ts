import { PartialType } from '@nestjs/mapped-types';
import { CreateOnOrderDto } from './create-on_order.dto';

export class UpdateOnOrderDto extends PartialType(CreateOnOrderDto) {
  id: number;
}
