import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { YcConfigService } from '../yc.config.service';
import { YcController } from '../yc.controller';
import { YcService } from '../yc.service';
import { YcTranslateService } from '../yc.translate.service';

jest.mock('../yc.service.ts');
jest.mock('../yc.config.service.ts');
jest.mock('../yc.translate.service.ts');
jest.mock('../yc.translate-gpt.service.ts');

const mockRequestTranslateData = {
    texts: ['translate'],
    sourceLanguageCode: 'en',
    targetLanguageCode: 'ru',
};

const mockResponseTranslateData = { translations: [{ text: 'translate', detectedLanguageCode: 'en' }] };
const mockResponseSupportedLanguagesData = { languages: [{ code: 'en', language: 'english' }] };
const mockResponseTranslateGptData = { translations: { texts: ['hello', 'world'] } };

describe('YcController', () => {
    let ycController: YcController;
    let ycService: YcService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [YcService, YcTranslateService, YcConfigService, ConfigService],
            imports: [HttpModule],
            controllers: [YcController],
        }).compile();

        ycController = module.get<YcController>(YcController);
        ycService = module.get<YcService>(YcService);
    });

    test('should be defined', () => {
        expect(ycController).toBeDefined();
    });

    describe('Test translateSimple', () => {
        let responseTranslateData;

        beforeEach(async () => {
            jest.clearAllMocks();
            responseTranslateData = await ycController.translateSimple(mockRequestTranslateData);
        });

        test('should be called 1 time', () => {
            expect(ycService.translateSimple).toBeCalledTimes(1);
        });

        test('should be called with dto', () => {
            expect(ycService.translateSimple).toBeCalledWith(mockRequestTranslateData);
        });

        test('should return translated data', () => {
            expect(responseTranslateData).toEqual(mockResponseTranslateData);
        });
    });

    describe('Test supportedLanguages', () => {
        let responseSupportedLanguages;

        beforeEach(async () => {
            responseSupportedLanguages = await ycController.supportedLanguages();
        });

        test('shoud be called 1 time', () => {
            expect(ycService.fetchSupportedLanguages).toBeCalledTimes(1);
        });

        test('shoud return supported languages', () => {
            expect(responseSupportedLanguages).toEqual(mockResponseSupportedLanguagesData);
        });
    });

    describe('Test translate gpt', () => {
        let responseTranslateData;

        beforeEach(async () => {
            responseTranslateData = await ycController.translateGpt(mockRequestTranslateData);
        });

        test('shoud be called 1 time', () => {
            expect(ycService.translateGpt).toBeCalledTimes(1);
        });

        test('shoud return translated data', () => {
            expect(responseTranslateData).toEqual(mockResponseTranslateGptData);
        });
    });
});
