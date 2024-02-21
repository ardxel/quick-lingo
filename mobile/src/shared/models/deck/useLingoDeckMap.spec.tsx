import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import { IAppAsyncStorage } from "shared/store";
import { useLingoDeckMap } from "./useLingoDeckMap";

const mockLingoDeckMap: IAppAsyncStorage["@decks"] = {
  deck: {
    cards: [],
    sourceLanguage: "ru",
    targetLanguage: "en",
    name: "deck",
  },
};

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

describe("Test useLingoDeckMap hook", () => {
  const renderUseLingoDeckMap = () =>
    renderHook(() => useLingoDeckMap(), {
      wrapper: ({ children }) => <NavigationContainer>{children}</NavigationContainer>,
    });

  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  test("deck map should initialize", async () => {
    await AsyncStorage.setItem("@decks", JSON.stringify(mockLingoDeckMap));

    const render = renderUseLingoDeckMap();

    await waitFor(() => {
      expect(render.result.current.isLoading).toBe(false);
    });

    expect(render.result.current.deckMap).toEqual(mockLingoDeckMap);
  });

  test("test clear function", async () => {
    const render = renderUseLingoDeckMap();

    await act(() => {
      render.result.current.clear();
    });

    await waitFor(() => {
      expect(render.result.current.deckMap).toEqual({});
    });
  });

  test("test update function", async () => {
    const render = renderUseLingoDeckMap();

    const updatedMockDeck = Object.assign(mockLingoDeckMap, {
      deck2: { cards: [], sourceLanguage: "en", targetLanguage: "ru" },
    });

    await act(async () => {
      await render.result.current.update(updatedMockDeck);
    });

    await waitFor(() => {
      expect(render.result.current.deckMap).toEqual(updatedMockDeck);
    });
  });

  test("test remove deck function", async () => {
    const render = renderUseLingoDeckMap();

    await act(() => {
      render.result.current.removeDeck("deck");
    });

    await waitFor(() => {
      expect(render.result.current.deckMap).not.toHaveProperty("deck");
    });
  });
});
