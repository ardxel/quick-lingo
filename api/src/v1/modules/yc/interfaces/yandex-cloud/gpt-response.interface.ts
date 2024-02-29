export type YcGptAlternative = {
    message: {
        role: 'system' | 'assistant' | 'user';
        text: string;
    };
    status: string;
};

export type YcGptResponseTextGeneration = {
    result: {
        alternatives: YcGptAlternative[];
        usage: {
            inputTextTokens: string;
            completionsTokens: string;
            totalTokens: string;
        };
        modelVersion: string;
    };
};
