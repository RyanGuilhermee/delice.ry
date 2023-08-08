import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
