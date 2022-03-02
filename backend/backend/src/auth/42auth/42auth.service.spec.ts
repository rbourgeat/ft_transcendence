import { Test, TestingModule } from '@nestjs/testing';
import { 42authService } from './42auth.service';

describe('42authService', () => {
  let service: 42authService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [42authService],
    }).compile();

    service = module.get<42authService>(42authService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
