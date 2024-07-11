import { Controller, Get, UseGuards } from '@nestjs/common';
import { MainService } from './main.service';
import { AuthenticatedGuard } from '../authenticated.guard';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  getMain() {
    return this.mainService.getWelcomeMessage();
  }
}
