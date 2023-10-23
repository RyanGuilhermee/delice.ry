import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAdressDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
