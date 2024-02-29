import { ICard } from "entities/card";
import { aggregateDeckCards } from "./aggregateDeckCards";

describe("test aggreagateDeckCards", () => {
  const cards: ICard[] = [
    {
      translations: ["текст1"],
      sourceText: "text1",
      cardId: "0",
      createdAt: new Date().toString(),
      playCount: 0,
      examples: ["test1", "test2", "test3"],
      synonyms: [],
    },
    {
      translations: ["пример"],
      sourceText: "example",
      cardId: "1",
      createdAt: new Date().toString(),
      playCount: 1,
      examples: ["test1", "test2", "test3"],
      synonyms: [],
    },
    {
      translations: ["тест"],
      sourceText: "test",
      cardId: "2",
      createdAt: new Date().toString(),
      playCount: 2,
      examples: ["test1", "test2", "test3"],
      synonyms: [],
    },
  ];

  type AggregateFnOptions = Parameters<typeof aggregateDeckCards>[1];

  const aggregateOptions: AggregateFnOptions = {
    sortBy: "New",
    currentPage: 1,
    pageLimit: 10,
    filterByText: "",
    decreasingOrder: false,
  };

  test("default options", () => {
    const result = aggregateDeckCards(cards, aggregateOptions);

    expect(result).toHaveLength(3);

    expect(result.at(0)).toEqual(cards[0]);
    expect(result.at(1)).toEqual(cards[1]);
    expect(result.at(2)).toEqual(cards[2]);
  });

  test("test sort by playCount", () => {
    const result1 = aggregateDeckCards(cards, { ...aggregateOptions, sortBy: "Play count", decreasingOrder: true });

    expect(result1.at(0)?.playCount).toEqual(2);
    expect(result1.at(-1)?.playCount).toEqual(0);

    const result2 = aggregateDeckCards(cards, { ...aggregateOptions, sortBy: "Play count", decreasingOrder: false });

    expect(result2.at(0)?.playCount).toEqual(0);
    expect(result2.at(-1)?.playCount).toEqual(2);
  });

  test("test sort by Alphabet", () => {
    const result1 = aggregateDeckCards(cards, { ...aggregateOptions, sortBy: "Alphabet", decreasingOrder: true });

    expect(result1.at(0)).toEqual(cards[0]);
    expect(result1.at(-1)).toEqual(cards[1]);

    const result2 = aggregateDeckCards(cards, { ...aggregateOptions, sortBy: "Alphabet", decreasingOrder: false });

    expect(result2.at(0)).toEqual(cards[1]);
    expect(result2.at(-1)).toEqual(cards[0]);
  });

  test("test sort by Useful", () => {
    const result1 = aggregateDeckCards(cards, { ...aggregateOptions, sortBy: "Useful", decreasingOrder: true });

    expect(result1.at(0)).toEqual(cards[0]);
    expect(result1.at(2)).toEqual(cards[2]);
  });

  test("test filter by user input", () => {
    const result = aggregateDeckCards(cards, { ...aggregateOptions, filterByText: "test" });

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(cards[2]);
  });

  test("test pagination", () => {
    const manyCards: ICard[] = Array.from({ length: 15 }, () => JSON.parse(JSON.stringify(cards[0])));

    // [page, expected result length]
    const expectedByPage = [
      [1, 10],
      [2, 5],
      [3, 0],
    ];

    expectedByPage.forEach(([page, expectedCardsLength]) => {
      const result = aggregateDeckCards(manyCards, { ...aggregateOptions, currentPage: page });

      expect(result).toHaveLength(expectedCardsLength);
    });
  });
});
