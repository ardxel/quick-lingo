export const YcTranslateGptService = jest.fn().mockReturnValue({
    translateWithAI: jest.fn().mockResolvedValue({ translations: { texts: ['hello world'] } }),
    getRequestSampleConfig: jest.fn().mockReturnValue({}),
});
