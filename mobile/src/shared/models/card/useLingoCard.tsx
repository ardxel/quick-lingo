import { useMemo } from "react";
import { useLingoDeck } from "../deck";

export const useLingoCard = (deckName: string, cardId: string) => {
  const { deck, updateDeck } = useLingoDeck(deckName);

  const card = useMemo(() => {
    return deck?.cards.find((card) => card.cardId === cardId);
  }, [deck]);

  const pushTranslation = (text: string) => {
    if (!card) return;
    if (card.translations.includes(text)) return;

    updateDeck((deck) => {
      const cardCopy = { ...card };
      cardCopy.translations.push(text);

      const index = deck.cards.findIndex((c) => c.cardId === cardId);
      if (index === -1) return deck;

      deck.cards[index] = cardCopy;

      return deck;
    });
  };

  const deleteTranslation = (targetIndex: number) => {
    if (!card) return;
    if (targetIndex < 0 || card.translations.length < targetIndex) return;

    updateDeck((deck) => {
      const cardCopy = { ...card };
      cardCopy.translations.splice(targetIndex, 1);

      const index = deck.cards.findIndex((c) => c.cardId === cardId);
      if (index === -1) return deck;

      deck.cards[index] = cardCopy;

      return deck;
    });
  };

  return {
    card,
    pushTranslation,
    deleteTranslation,
  };
};
