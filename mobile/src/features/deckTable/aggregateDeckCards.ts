import { ICard } from "shared/models";
import { sortByOption } from "./tableMenu";

export const aggregateDeckCards = (
  cards: ICard[] | undefined,
  opts: {
    filterByText: string;
    currentPage: number;
    pageLimit: number;
    sortBy: (typeof sortByOption)[number];
    decreasingOrder: boolean;
  },
): ICard[] => {
  if (!cards) return [];

  let result = [...cards];

  result = paginateCards(cards, opts.currentPage, opts.pageLimit);

  result = filterByUserInput(result, opts.filterByText);

  result = sortBySelectedOptions(result, opts.sortBy, opts.decreasingOrder);

  return result;
};

const filterByUserInput = (cards: ICard[], userInput: string): ICard[] => {
  if (!userInput.length) return cards;

  const searchCardText = userInput.toLowerCase();
  return cards.filter((card) => card.sourceText.toLowerCase().includes(searchCardText));
};

const paginateCards = (cards: ICard[], currentPage: number, pageLimit: number): ICard[] => {
  const totalPages = Math.ceil(cards.length / pageLimit);

  if (currentPage < 1 || currentPage > totalPages) {
    return [];
  }

  const startIndex = (currentPage - 1) * pageLimit;
  const endIndex = startIndex + pageLimit;
  const currentCards = cards.slice(startIndex, endIndex);

  return currentCards;
};

const sortBySelectedOptions = (
  cards: ICard[],
  selectedOption: (typeof sortByOption)[number],
  decreasingOrder: boolean,
): ICard[] => {
  switch (selectedOption) {
    case "Alphabet":
      return CardSort.sortBySourceText(cards, decreasingOrder);
    case "New":
      return CardSort.sortByCreatingDate(cards, decreasingOrder);
    case "Play count":
      return CardSort.sortByPlayCount(cards, decreasingOrder);
    case "Useful":
      return CardSort.sortByUseful(cards, decreasingOrder);
    default:
      return cards;
  }
};

class CardSort {
  static sortBySourceText(cards: ICard[], decreasingOrder: boolean) {
    return cards.sort((card1, card2) => {
      return decreasingOrder
        ? card2.sourceText.localeCompare(card1.sourceText)
        : card1.sourceText.localeCompare(card2.sourceText);
    });
  }
  static sortByCreatingDate(cards: ICard[], decreasingOrder: boolean) {
    return cards.sort((card1, card2) => {
      const time1 = new Date(card1.createdAt).getTime();
      const time2 = new Date(card2.createdAt).getTime();

      return decreasingOrder ? time2 - time1 : time1 - time2;
    });
  }

  static sortByPlayCount(cards: ICard[], decreasingOrder: boolean) {
    return cards.sort((card1, card2) => {
      return decreasingOrder ? card2.playCount - card1.playCount : card1.playCount - card2.playCount;
    });
  }

  static sortByUseful(cards: ICard[], decreasingOrder: boolean) {
    return cards.sort((card1, card2) => {
      return decreasingOrder
        ? card2.translations.length - card1.translations.length
        : card1.translations.length - card2.translations.length;
    });
  }
}
