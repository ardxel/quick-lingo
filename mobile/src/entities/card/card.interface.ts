export type ICard = {
  /* source text */
  sourceText: string;
  /* array of translations */
  translations: string[];

  synonyms: string[];

  examples: string[];

  createdAt: Date | string;

  playCount: number;

  cardId: string;
};
