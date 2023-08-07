import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    if (roles.includes('admin') && roles.includes('everyone')) {
      const isValid =
        (await this.verifyToken(token, process.env.JWT_SECRET_ADMIN)) ||
        (await this.verifyToken(token, process.env.JWT_SECRET));

      if (!isValid) {
        throw new UnauthorizedException('Invalid token');
      }

      return true;
    }

    if (roles.includes('admin')) {
      const isValid = await this.verifyToken(
        token,
        process.env.JWT_SECRET_ADMIN,
      );

      if (!isValid) {
        throw new UnauthorizedException('Invalid token');
      }

      return true;
    }

    const isValid = await this.verifyToken(token, process.env.JWT_SECRET);

    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private async verifyToken(token: string, secret: string) {
    try {
      await this.jwtService.verifyAsync(token, { secret });

      return true;
    } catch {
      return false;
    }
  }
}
