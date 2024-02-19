export const YcConfigService = jest.fn().mockReturnValue({
    fetchIamToken: jest.fn(),
    getRequestConfig: jest.fn().mockReturnValue({
        iamToken: 'iamToken',
        folderId: 'folderId',
    }),
});
