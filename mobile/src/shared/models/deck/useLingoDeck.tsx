import { useEffect, useState } from "react";
import { ICard } from "../card";
import { IDeck } from "./deck.interface";
import { useLingoDeckMap } from "./useLingoDeckMap";

/**
 * @warning very experimental
 */
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

    const deckMapCopy: typeof deckMap = JSON.parse(JSON.stringify(deckMap));
    deckMapCopy[deckName].cards.push(card);

    const updatedDeckMap = await update(deckMapCopy);

    setDeck(updatedDeckMap[deckName]);
  };

  return { addCard, deck };
};
