import { Test, TestingModule } from '@nestjs/testing';
import { GameStopResolver } from './game-stop.resolver';

describe('GameStopResolver', () => {
  let resolver: GameStopResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameStopResolver],
    }).compile();

    resolver = module.get<GameStopResolver>(GameStopResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
