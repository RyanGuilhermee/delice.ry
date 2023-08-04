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

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    const isPassword = user
      ? await bcrypt.compare(password, user.password)
      : null;

    if (!user || !isPassword) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync({ user_id: user.id }),
    };
  }
}
