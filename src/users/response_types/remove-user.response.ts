import { ApiProperty } from '@nestjs/swagger';

export class RemoveUserResponse {
  @ApiProperty({ type: 'number', default: 200 })
  statusCode: number;

  @ApiProperty({ type: 'string' })
  message: string;
}
