import { Test, TestingModule } from '@nestjs/testing';
import { YcService } from './yc.service';

describe('YcService', () => {
    let service: YcService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [YcService],
        }).compile();

        service = module.get<YcService>(YcService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
