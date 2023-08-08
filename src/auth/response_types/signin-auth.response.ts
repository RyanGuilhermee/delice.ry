import { ApiProperty } from '@nestjs/swagger';

export class SignInAuthResponse {
  @ApiProperty({ type: 'number', default: 200 })
  statusCode: number;

  @ApiProperty({ type: 'string' })
  accessToken: string;
}
