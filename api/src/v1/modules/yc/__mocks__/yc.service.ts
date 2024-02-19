export const YcService = jest.fn().mockReturnValue({
    translateSimple: jest.fn().mockResolvedValue({ translations: [{ text: 'translate', detectedLanguageCode: 'en' }] }),
    fetchSupportedLanguages: jest.fn().mockResolvedValue({ languages: [{ code: 'en', language: 'english' }] }),
});
