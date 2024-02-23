export type LanguageList = Array<{ code: string; name?: string }>;

export type ResponsePayloadLanguageList = { languages: LanguageList };

export type ResponsePayloadTranslations = {
  translations: { texts: string[] };
};
