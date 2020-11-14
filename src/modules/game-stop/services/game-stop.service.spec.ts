import { Test, TestingModule } from '@nestjs/testing';
import { GameStopService } from './game-stop.service';

describe('GameStopService', () => {
  let service: GameStopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameStopService],
    }).compile();

    service = module.get<GameStopService>(GameStopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
