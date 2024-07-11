import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { AuthenticatedGuard } from '../authenticated.guard';

@Module({
  controllers: [MainController],
  providers: [MainService, AuthenticatedGuard],
})
export class MainModule {}
