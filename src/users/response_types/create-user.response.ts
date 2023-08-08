import { ApiProperty } from '@nestjs/swagger';
import { FindUserDto } from '../dto/find-user.dto';

export class CreateUserResponse {
  @ApiProperty({ type: 'number', default: 201 })
  statusCode: number;

  @ApiProperty({ type: FindUserDto })
  user: FindUserDto;
}
