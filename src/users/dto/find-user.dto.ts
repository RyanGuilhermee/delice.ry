import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'boolean', default: false })
  isAdmin: boolean;
}
