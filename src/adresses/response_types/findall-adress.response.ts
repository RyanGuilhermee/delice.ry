import { ApiProperty } from '@nestjs/swagger';
import { FindAdressDto } from '../dto/find-adress.dto';

export class FindAllAdressesResponse {
  @ApiProperty({ type: 'number', default: 200 })
  statusCode: number;

  @ApiProperty({ type: [FindAdressDto] })
  adresses: FindAdressDto[];
}
