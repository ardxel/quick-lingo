// prettier-ignore
export type SortCardsInSessionOption =
  /** @see {@link import('../utils/sortCards.ts')}*/
  | "New"					// sort case implemented ✔
  | "Alphabet"		// sort case implemented ✔
  | "Play count"	// sort case implemented ✔
  | "Useful"			// sort case implemented ✔
  | "Random" // sort case implemented ✔

export type CardsInSessionOption = 5 | 10 | 15 | 20 | "all";

export interface IAppAsyncStorage {
  "@decks": Record<string, import("entities/card").ICard>;
  "@settings": {
    basicDeck: string | null;
    sortTypeInSession: SortCardsInSessionOption;
    cardsInSession: CardsInSessionOption;
    showCardsCount: boolean;
    showSynonymsHelper: boolean;
    showExamplesHelper: boolean;
  };
}
