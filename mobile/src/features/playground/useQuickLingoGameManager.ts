import { useEffect, useRef, useState } from "react";
import { ICard, useLingoDeck } from "shared/models";

type QuickLingoGameManager = {
  popCard: () => void;
  currentCard: ICard | null;
  hasNext: boolean;
  cardsCount: number;
  currentCardIndex: number;
};

export const useQuickLingoGameManager = (lingoDeckName: string): QuickLingoGameManager => {
  const { deck, updateDeck } = useLingoDeck(lingoDeckName);
  const [stack, setStack] = useState<ICard[]>([]);
  const lingoDeckNamRef = useRef<string | null>();

  useEffect(() => {
    if (!deck) return;

    if (!lingoDeckNamRef.current || lingoDeckNamRef.current !== lingoDeckName) {
      lingoDeckNamRef.current = lingoDeckName;
      setStack(deck.cards);
    }
  }, [deck]);

  const currentCard = stack.length ? stack[stack.length - 1] : null;

  const hasNext = Boolean(stack.length);

  const cardsCount = deck?.cards.length || 0;

  const currentCardIndex = stack.length;

  const popCard = () => {
    if (!hasNext) return;
    if (!deck) return;

    const cardIndex = deck.cards.findIndex((c) => c.cardId === currentCard!.cardId);

    if (cardIndex === -1) return;

    updateDeck((deck) => {
      deck.cards[cardIndex].playCount++;
      return deck;
    });

    setStack((prev) => prev!.slice(0, -1));
  };

  return {
    popCard,
    currentCard,
    hasNext,
    cardsCount,
    currentCardIndex,
  };
};
