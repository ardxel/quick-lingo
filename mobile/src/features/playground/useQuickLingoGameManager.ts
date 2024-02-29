import { useFocusEffect } from "@react-navigation/native";
import { ICard } from "entities/card";
import { useLingoDeck } from "entities/deck";
import { useLingoSettings } from "entities/settings";
import { useCallback, useRef, useState } from "react";
import { CardSort } from "shared/utils";

type QuickLingoGameManager = {
  popCard: () => void;

  currentCard: ICard;

  hasNext: boolean;

  cardsCount: number;

  currentCardIndex: number;

  reloadCards: () => void;
};

// type QuickLingoGameState = "start" | "process" | "end";

export const useQuickLingoGameManager = (lingoDeckName: string): QuickLingoGameManager => {
  const { settings, isLoading: isSettingsLoading, reload: reloadSettings } = useLingoSettings();
  const { deck, updateDeck, isLoading: isDeckLoading } = useLingoDeck(lingoDeckName);

  const [stack, setStack] = useState<ICard[]>([]);
  const [cardsCount, setCardsCount] = useState<number>(0);
  const deckNameInGame = useRef<string | null>();

  const isLoading = [isSettingsLoading, isDeckLoading].some(Boolean);

  const currentCard = stack[stack.length - 1];
  const hasNext = Boolean(stack.length);
  const currentCardIndex = stack.length;

  const reloadCards = () => {
    if (!deck || !settings || isLoading) return;
    reloadSettings();

    const sorted = CardSort.sort(deck.cards, settings.sortTypeInSession);
    const sliced = settings.cardsInSession === "all" ? sorted : sorted.slice(0, settings.cardsInSession + 1);

    setCardsCount(sliced.length);
    setStack(sliced);
  };

  useFocusEffect(
    useCallback(() => {
      if (!deck || isLoading) return;

      const renderNewGame =
        !deckNameInGame.current ||
        deckNameInGame.current !== lingoDeckName ||
        stack.length === 0 ||
        (lingoDeckName === deckNameInGame.current && stack.length === 0);

      if (renderNewGame) {
        deckNameInGame.current = lingoDeckName;
        reloadCards();
      }
    }, [deck, lingoDeckName, isLoading]),
  );

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
    reloadCards,
  };
};
