import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { ApiResponse } from '@nestjs/swagger';
import { SignInAuthResponse } from './response_types/signin-auth.response';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 200, type: SignInAuthResponse })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    return {
      statusCode: 200,
      accessToken: token,
    };
  }

  @ApiResponse({ status: 200, type: SignInAuthResponse })
  @HttpCode(HttpStatus.OK)
  @Post('login/admin')
  async signInAdmin(@Body() signInDto: SignInDto) {
    const token = await this.authService.signInAdmin(
      signInDto.email,
      signInDto.password,
    );

    return {
      statusCode: 200,
      accessToken: token,
    };
  }
}
