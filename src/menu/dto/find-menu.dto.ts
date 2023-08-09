import { ApiProperty } from '@nestjs/swagger';

export class FindMenuDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string', enum: ['food', 'drink'] })
  category: string;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  price: number;

  @ApiProperty({ type: 'string' })
  description: string;

  @ApiProperty({ type: 'string' })
  image: string;

  @ApiProperty({ type: 'boolean' })
  available: boolean;
}
