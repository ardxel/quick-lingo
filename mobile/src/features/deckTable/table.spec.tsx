import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { render, waitFor } from "@testing-library/react-native";
import { IAppAsyncStorage } from "shared/store";
import { DeckTable } from "./table";
import { ICard } from "entities/card";

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

const mockLingoCard1: ICard = {
  translations: ["текст1"],
  sourceText: "text1",
  cardId: "1",
  createdAt: new Date().toString(),
  playCount: 0,
  examples: [],
  synonyms: [],
};

const mockLingoCard2: ICard = {
  translations: ["пример"],
  sourceText: "example",
  cardId: "1",
  createdAt: new Date().toString(),
  playCount: 0,
  examples: [],
  synonyms: [],
};

describe("Test table in deck edit screen", () => {
  const mockLingoDeckMapWithCards = () => {
    const deckMap = JSON.parse(JSON.stringify(mockLingoDeckMap));
    deckMap.deck.cards.push(mockLingoCard1, mockLingoCard2);
    return deckMap;
  };

  // beforeEach(async () => {
  //   await waitFor(() => AsyncStorage.clear());
  // });

  test("table shoud rendered", async () => {
    const deckMap = mockLingoDeckMapWithCards();
    await AsyncStorage.setItem("@decks", JSON.stringify(deckMap));

    const result = await waitFor(() =>
      render(<DeckTable deckName={"deck"} inputSearchCard={""} />, {
        wrapper: ({ children }) => <NavigationContainer>{children}</NavigationContainer>,
      }),
    );

    const rows = result.queryAllByTestId("card-row");

    expect(rows).toHaveLength(2);
  });
});
