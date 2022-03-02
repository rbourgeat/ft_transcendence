import { Test, TestingModule } from '@nestjs/testing';
import { 42authController } from './42auth.controller';

describe('42authController', () => {
  let controller: 42authController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [42authController],
    }).compile();

    controller = module.get<42authController>(42authController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
