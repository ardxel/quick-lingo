interface YCResponseIAMToken {
    iamToken: string;
    expiresAt: string;
}

interface YCResponseSupportedLanguageList {
    languages: Array<{ code: string; name: string }>;
}

interface YCResponseTranslate {
    translations: Array<{ text: string; detectedLanguageCode?: string }>;
}

export type { YCResponseIAMToken, YCResponseSupportedLanguageList, YCResponseTranslate };
