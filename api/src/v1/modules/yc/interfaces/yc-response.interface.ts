interface YCResponseIAMToken {
    iamToken: string;
    expiresAt: string;
}

interface YCResponseListLanguages {
    languages: Array<{ code: string; name: string }>;
}

interface YCResponseTranslate {
    translations: Array<{ text: string; detectedLanguageCode?: string }>;
}

export type { YCResponseIAMToken, YCResponseListLanguages, YCResponseTranslate };
