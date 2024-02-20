export const YcService = jest.fn().mockReturnValue({
    translateSimple: jest.fn().mockResolvedValue({ translations: [{ text: 'translate', detectedLanguageCode: 'en' }] }),
    translateGpt: jest.fn().mockResolvedValue({ translations: { texts: ['hello', 'world'] } }),
    fetchSupportedLanguages: jest.fn().mockResolvedValue({ languages: [{ code: 'en', language: 'english' }] }),
});
