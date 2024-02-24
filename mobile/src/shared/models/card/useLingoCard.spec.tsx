import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import { IAppAsyncStorage } from "shared/store";
import { ICard } from "./card.interface";
import { useLingoCard } from "./useLingoCard";

const mockLingoDeckMap: IAppAsyncStorage["@decks"] = {
  deck: {
    cards: [],
    sourceLanguage: "ru",
    targetLanguage: "en",
    name: "deck",
  },
};

const mockLingoCard: ICard = {
  translations: ["hello", "world"],
  expanded: false,
  sourceText: "Привет мир",
  cardId: "cardId",
  createdAt: "now",
  playCount: 0,
};

const mockLingoDeckName = mockLingoDeckMap.deck.name;

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

describe("Text useLingoCard hook", () => {
  const getMockLingoDeckMapWithLingoCard = () => {
    const deckMap: IAppAsyncStorage["@decks"] = JSON.parse(JSON.stringify(mockLingoDeckMap));
    deckMap.deck.cards.push({ ...mockLingoCard });
    return JSON.stringify(deckMap);
  };
  const renderUseLingoCard = () =>
    renderHook(() => useLingoCard(mockLingoDeckName, mockLingoCard.cardId), {
      wrapper: ({ children }) => <NavigationContainer>{children}</NavigationContainer>,
    });

  beforeEach(async () => await AsyncStorage.clear());

  test("card prop shoud be not null", async () => {
    await AsyncStorage.setItem("@decks", getMockLingoDeckMapWithLingoCard());

    const render = renderUseLingoCard();

    await waitFor(() => {
      expect(render.result.current.card).toEqual(mockLingoCard);
    });

    expect(render.result.current.pushTranslation).toBeInstanceOf(Function);
    expect(render.result.current.deleteTranslation).toBeInstanceOf(Function);
  });

  test("test pushTranslation function", async () => {
    await AsyncStorage.setItem("@decks", getMockLingoDeckMapWithLingoCard());

    const render = renderUseLingoCard();

    await waitFor(() => {
      expect(render.result.current.card?.translations).toHaveLength(2);
    });

    await act(() => {
      render.result.current.pushTranslation("text");
    });

    await waitFor(() => {
      expect(render.result.current.card?.translations.at(-1)).toEqual("text");
    });
  });

  test("test deleteTranslation function", async () => {
    await AsyncStorage.setItem("@decks", getMockLingoDeckMapWithLingoCard());

    const render = renderUseLingoCard();

    await waitFor(() => {
      expect(render.result.current.card?.translations.length).toEqual(2);
    });

    await act(() => {
      render.result.current.deleteTranslation(1);
    });

    await waitFor(() => {
      expect(render.result.current.card?.translations).toHaveLength(1);
    });

    await act(() => {
      render.result.current.deleteTranslation(0);
    });

    await waitFor(() => {
      expect(render.result.current.card?.translations).toEqual([]);
    });
  });
});
