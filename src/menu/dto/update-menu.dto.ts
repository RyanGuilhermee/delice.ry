import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @ApiProperty({ type: 'string', enum: ['food', 'drink'] })
  @IsString()
  @IsNotEmpty()
  @IsIn(['food', 'drink'])
  category: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  @IsNotEmpty()
  available: boolean;
}
