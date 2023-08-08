import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    const isPassword = user
      ? await bcrypt.compare(password, user.password)
      : null;

    if (!user || !isPassword) {
      throw new UnauthorizedException('User email or pessword wrong');
    }

    return await this.jwtService.signAsync(
      { user_id: user.id },
      { secret: process.env.JWT_SECRET },
    );
  }

  async signInAdmin(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    const isPassword = user
      ? await bcrypt.compare(password, user.password)
      : null;

    if (!user || !isPassword) {
      throw new UnauthorizedException('User email or pessword wrong');
    }

    if (!user.is_admin) {
      throw new UnauthorizedException('User is not admin');
    }

    return await this.jwtService.signAsync(
      { user_id: user.id },
      { secret: process.env.JWT_SECRET_ADMIN },
    );
  }
}
