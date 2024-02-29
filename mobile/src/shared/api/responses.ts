export type LanguageList = Array<{ code: string; name?: string }>;

export type ResponsePayloadLanguageList = { languages: LanguageList };

export type ResponsePayloadTranslations = {
  sourceText: string;
  translations: string[];
  examples?: string[];
  synonyms?: string[];
};
