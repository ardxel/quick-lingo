export type IDeck = {
  name: string;
  sourceLanguage: string;
  targetLanguage: string;
  cards: import("./card").Card[];
};
