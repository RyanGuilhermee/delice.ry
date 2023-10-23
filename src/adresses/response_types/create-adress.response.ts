import { ApiProperty } from '@nestjs/swagger';
import { FindAdressDto } from '../dto/find-adress.dto';

export class CreateAdressResponse {
  @ApiProperty({ type: 'number', default: 201 })
  statusCode: number;

  @ApiProperty({ type: FindAdressDto })
  adress: FindAdressDto;
}
