import { Test, TestingModule } from '@nestjs/testing';
import { GameStopController } from './game-stop.controller';

describe('GameStopController', () => {
  let controller: GameStopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameStopController],
    }).compile();

    controller = module.get<GameStopController>(GameStopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
