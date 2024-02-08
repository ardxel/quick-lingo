interface ResponseIAMToken {
    iamToken: string;
    expiresAt: string;
}

interface ResponseListLanguages {
    languages: Array<{ code: string; name: string }>;
}

interface ResponseTranslate {
    translations: Array<{ text: string; detectedLanguageCode?: string }>;
}

export type { ResponseIAMToken, ResponseListLanguages, ResponseTranslate };
