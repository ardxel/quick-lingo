import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLingoDeck } from "./useLingoDeck";
import { renderHook, waitFor, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

const mockLingoDeckMap = {
  deck: {
    cards: [],
    sourceLanguage: "ru",
    targetLanguage: "en",
    name: "deck",
  },
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
    const mockTranslationCard = {
      translations: ["hello", "world"],
      expanded: false,
      sourceText: "привет мир",
    };

    await AsyncStorage.setItem("@decks", JSON.stringify(mockLingoDeckMap));

    const render = renderUseLingoDeck();

    await waitFor(() => {
      expect(render.result.current.deck).not.toBeNull();
    });

    await act(() => {
      render.result.current.addCard({ ...mockTranslationCard });
    });

    await waitFor(() => {
      expect(render.result.current.deck?.cards).toHaveLength(1);
      expect(render.result.current.deck?.cards[0]).toEqual(mockTranslationCard);
    });
  });
});
