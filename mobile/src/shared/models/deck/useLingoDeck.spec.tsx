import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLingoDeck } from "./useLingoDeck";
import { renderHook, waitFor, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ICard } from "../card";
import { IAppAsyncStorage } from "shared/store";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

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
  cardId: "randomId",
  createdAt: "now",
  playCount: 0,
};

const mockLingoDeckName = "deck";

describe("Test useLingoDeck hook", () => {
  const renderUseLingoDeck = () =>
    renderHook(() => useLingoDeck(mockLingoDeckName), {
      wrapper: ({ children }) => <NavigationContainer>{children}</NavigationContainer>,
    });

  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  test("useLingoDeck.deck should be not nullable", async () => {
    await AsyncStorage.setItem("@decks", JSON.stringify(mockLingoDeckMap));

    const render = renderUseLingoDeck();

    await waitFor(() => {
      expect(render.result.current.deck).toEqual(mockLingoDeckMap.deck);
    });
  });

  test("useLingoDeck.deck should be null", async () => {
    const render = renderUseLingoDeck();

    await waitFor(() => {
      expect(render.result.current.deck).toBe(null);
    });
  });

  test("test addCard function", async () => {
    await AsyncStorage.setItem("@decks", JSON.stringify(mockLingoDeckMap));

    const render = renderUseLingoDeck();

    await waitFor(() => {
      expect(render.result.current.deck).not.toBeNull();
    });

    await act(async () => {
      await render.result.current.addCard({ ...mockLingoCard });
    });

    await waitFor(() => {
      expect(render.result.current.deck?.cards).toHaveLength(1);
      expect(render.result.current.deck?.cards[0]).toEqual(mockLingoCard);
    });
  });

  test("test deleteCards function", async () => {
    const mockDeckMap = mockLingoDeckMap;
    mockDeckMap.deck.cards.push(mockLingoCard);

    await AsyncStorage.setItem("@decks", JSON.stringify(mockDeckMap));

    const render = renderUseLingoDeck();

    await waitFor(() => {
      expect(render.result.current.deck).toEqual(mockDeckMap.deck);
    });

    await act(async () => {
      render.result.current.deleteCards(mockLingoCard);
    });

    await waitFor(() => {
      expect(render.result.current.deck?.cards).toHaveLength(0);
    });
  });
});
