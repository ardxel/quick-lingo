import { Test, TestingModule } from '@nestjs/testing';
import { YcController } from './yc.controller';

describe('YcController', () => {
    let controller: YcController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [YcController],
        }).compile();

        controller = module.get<YcController>(YcController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
