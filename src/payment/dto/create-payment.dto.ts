import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Identification {
  @ApiProperty({ type: 'string' })
  @IsString()
  type: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  number: string;
}

class Payer {
  @ApiProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ type: Identification })
  @ValidateNested({ each: true })
  @Type(() => Identification)
  identification: Identification;
}

export class CreatePaymentDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  payment_method_id: string;

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  transaction_amount: number;

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  installments: number;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: Payer })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Payer)
  payer: Payer;
}
