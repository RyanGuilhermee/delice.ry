import { ApiProperty } from '@nestjs/swagger';
import { FindMenuDto } from '../dto/find-menu.dto';

export class FindMenuResponse {
  @ApiProperty({ type: 'number', default: 200 })
  statusCode: number;

  @ApiProperty({ type: FindMenuDto })
  menu: FindMenuDto;
}
