import { ICard } from "entities/card";
import { sortByOption } from "./tableMenu";
import { CardSort } from "shared/utils";

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

  result = CardSort.sort(result, opts.sortBy, opts.decreasingOrder);

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
