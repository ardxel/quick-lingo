import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { YcConfigService } from '../yc.config.service';
import { YcTranslateService } from '../yc.translate.service';

jest.mock('../yc.config.service.ts');

describe('YcTranslateService', () => {
    let ycTranslateService: YcTranslateService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [YcConfigService, YcTranslateService, ConfigService],
            imports: [HttpModule],
        }).compile();

        ycTranslateService = module.get<YcTranslateService>(YcTranslateService);
    });

    test('should be defined', () => {
        expect(ycTranslateService).toBeDefined();
    });
});
