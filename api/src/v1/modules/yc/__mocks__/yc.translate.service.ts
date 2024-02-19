export const YcTranslateService = jest.fn().mockReturnValue({
    translate: jest.fn().mockResolvedValue({
        translations: [{ text: 'translate', detectedLanguageCode: 'en' }],
    }),
    fetchSupportedLanguages: jest.fn().mockResolvedValue({
        languages: [{ code: 'en', language: 'english' }],
    }),
    prepareRequest: jest.fn().mockReturnValue({}),
    isYandexException: jest.fn().mockReturnValue(true),
    handleYandexException: jest.fn(),
});
