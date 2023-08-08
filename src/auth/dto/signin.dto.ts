import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
