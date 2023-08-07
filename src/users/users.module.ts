import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from 'src/repositories/users.repository';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthGuard],
})
export class UsersModule {}
