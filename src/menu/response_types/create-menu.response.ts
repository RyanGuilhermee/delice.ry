import { ApiProperty } from '@nestjs/swagger';
import { FindMenuDto } from '../dto/find-menu.dto';

export class CreateMenuResponse {
  @ApiProperty({ type: 'number', default: 201 })
  statusCode: number;

  @ApiProperty({ type: FindMenuDto })
  menu: FindMenuDto;
}
