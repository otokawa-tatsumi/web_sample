import { Test, TestingModule } from '@nestjs/testing';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { ExecutionContext } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

describe('MainController', () => {
  let mainController: MainController;
  let mainService: MainService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MainController],
      providers: [
        MainService,
        {
          provide: APP_GUARD,
          useValue: {
            canActivate: (context: ExecutionContext) => true,
          },
        },
      ],
    }).compile();

    mainController = moduleRef.get<MainController>(MainController);
    mainService = moduleRef.get<MainService>(MainService);
  });

  it('should be defined', () => {
    expect(mainController).toBeDefined();
  });

  it('should return welcome message', () => {
    expect(mainController.getMain()).toEqual({ message: 'Welcome, you are authenticated.' });
  });
});
