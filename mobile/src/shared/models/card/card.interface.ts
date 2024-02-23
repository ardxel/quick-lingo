export type ICard = {
  /* source text */
  sourceText: string;
  /* array of translations */
  translations: string[];
  /* this means that the map was already in the game
   * and there was an additional request to translate
   * the source text with additional translations
   */
  expanded: boolean;

  createdAt: Date | string;

  playCount: number;
};
