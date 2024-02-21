import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { IAppAsyncStorage, asyncStorageApi, useSafeAsyncStorage } from "shared/store";

export const useLingoDeckMap = () => {
  const { get: getDeckMapFromAsyncStorage, set: setDeckMapInAsyncStorage } = useSafeAsyncStorage("@decks");
  const [deckMap, setDeckMap] = useState<IAppAsyncStorage["@decks"]>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDeckMap = useCallback(() => {
    setIsLoading(true);
    getDeckMapFromAsyncStorage().then((parsedDeckMap) => {
      if (!parsedDeckMap) {
        setDeckMapInAsyncStorage({});
        setDeckMap({});
      } else setDeckMap(parsedDeckMap);

      setIsLoading(false);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDeckMap();
    }, []),
  );

  const clear = useCallback(() => {
    asyncStorageApi.clear().then(() => setDeckMap({}));
  }, []);

  /** @note make copy yourself */
  const update = useCallback(
    async (updatedDeckMap: IAppAsyncStorage["@decks"]) => {
      await setDeckMapInAsyncStorage(updatedDeckMap);

      setDeckMap(updatedDeckMap);

      return updatedDeckMap;
    },
    [deckMap],
  );

  const removeDeck = useCallback(
    async (deckName: string) => {
      if (!deckMap || !(deckName in deckMap)) return;

      const copy = { ...deckMap };
      delete copy[deckName];

      await setDeckMapInAsyncStorage(copy);
      setDeckMap(copy);
    },
    [deckMap],
  );

  return {
    deckMap,
    clear,
    removeDeck,
    update,
    isLoading,
  };
};
