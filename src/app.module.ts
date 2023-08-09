import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, MenuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
