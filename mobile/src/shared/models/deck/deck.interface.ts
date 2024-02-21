export type IDeck = {
  name: string;
  sourceLanguage: string;
  targetLanguage: string;
  cards: import("shared/models").ICard[];
};
