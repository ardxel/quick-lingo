export type YcGptAlternative = {
    message: string;
    role: 'system' | 'assistant' | 'user';
    text: string;
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
