import { useEffect, useState } from "react";
import { ICard } from "../card";
import { IDeck } from "./deck.interface";
import { useLingoDeckMap } from "./useLingoDeckMap";
import { copy } from "shared/utils";

export const useLingoDeck = (deckName: string) => {
  const { deckMap, update, isLoading } = useLingoDeckMap();
  const [deck, setDeck] = useState<IDeck | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!deckMap || !deckMap[deckName]) return;

    setDeck(deckMap[deckName]);
  }, [deckMap, isLoading]);

  const addCard = async (card: ICard) => {
    if (!deck || !deckName) return;

    const isExist = Boolean(deck.cards.find((c) => c.sourceText === card.sourceText));

    if (isExist) return;

    await updateDeck((deck) => {
      deck.cards.push(card);
      return deck;
    });
  };

  const deleteCards = async (...cards: ICard[]) => {
    if (!deck || !deckName) return;

    await updateDeck((deck) => {
      deck.cards = deck.cards.filter((card) => !cards.find((c) => c.sourceText === card.sourceText));
      return deck;
    });
  };

  const updateDeck = async (callback: (deck: IDeck) => IDeck) => {
    const deckMapCopy = copy(deckMap);
    const updatedDeck = callback(deckMapCopy[deckName]);

    deckMapCopy[deckName] = updatedDeck;

    const updatedDeckMap = await update(deckMapCopy);

    setDeck(updatedDeckMap[deckName]);
  };

  return { addCard, deck, deleteCards, updateDeck, isLoading };
};
