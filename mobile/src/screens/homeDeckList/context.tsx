import { createContext, useContext } from "react";

type DeckScreenContextProps = {
  onSearhDeckInput: (userInput: string) => void;
  searchDeckInput: string;
};

export const DeckScreenContext = createContext<DeckScreenContextProps>({} as DeckScreenContextProps);

export const useDeckScreenContext = () => useContext(DeckScreenContext);
