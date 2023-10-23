import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdressDto } from './create-adress.dto';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateAdressDto extends PartialType(CreateAdressDto) {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  number: number;
}
