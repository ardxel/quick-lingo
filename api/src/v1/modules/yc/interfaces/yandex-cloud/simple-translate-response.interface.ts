export type YCResponseIAMToken = {
    iamToken: string;
    expiresAt: string;
};

export type YCResponseSupportedLanguageList = {
    languages: Array<{ code: string; name: string }>;
};

export type YCResponseTranslate = {
    translations: Array<{ text: string; detectedLanguageCode?: string }>;
};
