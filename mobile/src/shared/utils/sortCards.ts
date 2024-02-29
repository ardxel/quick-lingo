import { ICard } from "shared/models";

export class CardSort {
  private static byRandom(cards: ICard[]) {
    const copyCards = [...cards];
    const randomized: ICard[] = [];

    while (copyCards.length) {
      const randomIndex = Math.floor(Math.random() * copyCards.length);

      if (!copyCards[randomIndex]) continue;

      randomized.push(copyCards[randomIndex]);
      copyCards.splice(randomIndex, 1);
    }

    return randomized;
  }

  private static byAlphabet(cards: ICard[], decreasingOrder: boolean) {
    return cards.sort((card1, card2) => {
      return decreasingOrder
        ? card2.sourceText.localeCompare(card1.sourceText)
        : card1.sourceText.localeCompare(card2.sourceText);
    });
  }
  private static byDate(cards: ICard[], decreasingOrder: boolean) {
    return cards.sort((card1, card2) => {
      const time1 = new Date(card1.createdAt).getTime();
      const time2 = new Date(card2.createdAt).getTime();

      return decreasingOrder ? time2 - time1 : time1 - time2;
    });
  }

  private static byPlayCount(cards: ICard[], decreasingOrder: boolean) {
    return cards.sort((card1, card2) => {
      return decreasingOrder ? card2.playCount - card1.playCount : card1.playCount - card2.playCount;
    });
  }

  private static byUseful(cards: ICard[], decreasingOrder: boolean) {
    return cards.sort((card1, card2) => {
      return decreasingOrder
        ? card2.translations.length - card1.translations.length
        : card1.translations.length - card2.translations.length;
    });
  }

  public static sort(cards: ICard[], type: import("shared/store").SortCardsInSessionOption, decreasingOrder = false) {
    switch (type) {
      case "Alphabet":
        return CardSort.byAlphabet(cards, decreasingOrder);
      case "New":
        return CardSort.byDate(cards, decreasingOrder);
      case "Play count":
        return CardSort.byPlayCount(cards, decreasingOrder);
      case "Useful":
        return CardSort.byUseful(cards, decreasingOrder);
      case "Random":
        return CardSort.byRandom(cards);
      default:
        return cards;
    }
  }
}
