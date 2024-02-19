import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { YcConfigService } from '../yc.config.service';
import { YcService } from '../yc.service';
import { YcTranslateService } from '../yc.translate.service';

jest.mock('../yc.config.service.ts');
jest.mock('../yc.translate.service.ts');

const mockTranslatedData = { translations: [{ text: 'translate', detectedLanguageCode: 'en' }] };
const mockSupportedLanguages = { languages: [{ code: 'en', language: 'english' }] };

describe('YcService', () => {
    let ycService: YcService;
    let ycTranslateService: YcTranslateService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [YcService, YcConfigService, YcTranslateService, ConfigService],
            imports: [HttpModule],
        }).compile();

        ycService = module.get<YcService>(YcService);
        ycTranslateService = module.get<YcTranslateService>(YcTranslateService);
    });

    test('should be defined', () => {
        expect(ycService).toBeDefined();
    });

    describe('Test translate simple', () => {
        let translatedData;

        beforeEach(async () => {
            translatedData = await ycService.translateSimple({
                texts: ['translate'],
                sourceLanguageCode: 'en',
                targetLanguageCode: 'ru',
            });
        });

        test('ycTranslateService shoud be called', () => {
            expect(ycTranslateService.translate).toBeCalled();
        });

        test('should resolve translated data', () => {
            expect(translatedData).toEqual(mockTranslatedData);
        });
    });

    describe('Test supported languages', () => {
        let supportedLanguages;

        beforeEach(async () => {
            supportedLanguages = await ycService.fetchSupportedLanguages();
        });

        test('ycTranslateService.supportedLanguages shoud be called', () => {
            expect(ycTranslateService.fetchSupportedLanguages).toBeCalled();
        });

        test('should resolve supported languages', () => {
            expect(supportedLanguages).toEqual(mockSupportedLanguages);
        });
    });
});
