import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from 'src/repositories/menu.repository';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  controllers: [MenuController],
  providers: [MenuService, MenuRepository, AuthGuard],
})
export class MenuModule {}
