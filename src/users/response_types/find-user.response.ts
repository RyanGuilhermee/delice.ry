import { ApiProperty } from '@nestjs/swagger';
import { FindUserDto } from '../dto/find-user.dto';

export class FindUserResponse {
  @ApiProperty({ type: 'number', default: 200 })
  statusCode: number;

  @ApiProperty({ type: FindUserDto })
  user: FindUserDto;
}
