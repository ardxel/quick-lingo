import { FC, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { IDeck, useLingoDeck } from "shared/models";
import { color } from "shared/vars";
import { aggregateDeckCards } from "./aggregateDeckCards";
import { DeckTableRow } from "./row";
import { DeckTableMenu, DeckTableSortOption, sortByOption } from "./tableMenu";

type Props = {
  deck: IDeck;
  inputSearchCard: string;
  deckName: string;
};

const CARD_COUNT_PER_PAGE = 8;

export const DeckTable: FC<Props> = ({ inputSearchCard, deckName }) => {
  const { deck, deleteCards } = useLingoDeck(deckName);
  const [chechedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sortInDecreasingOrder, setSortInDecreasingOrder] = useState(false);
  const [selectedSortOption, setSelectedSortOptions] = useState<DeckTableSortOption>(sortByOption[0]);

  const totalPages = deck ? Math.ceil(deck.cards.length / CARD_COUNT_PER_PAGE) : 0;

  const aggregatedCards = useMemo(
    () =>
      aggregateDeckCards(deck?.cards, {
        filterByText: inputSearchCard,
        currentPage: page,
        sortBy: selectedSortOption,
        pageLimit: CARD_COUNT_PER_PAGE,
        descreasingOrder: sortInDecreasingOrder,
      }),
    [deck, page, sortInDecreasingOrder, selectedSortOption, inputSearchCard],
  );

  return (
    <View style={s.tableWrapper}>
      <DeckTableMenu
        deleteCards={async () => {
          const selectedCards = checked.map((index) => aggregatedCards[index]);
          await deleteCards(...selectedCards);
          setChecked([]);
        }}
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
        onSelectSortOption={(type) => setSelectedSortOptions(type)}
        toggleSortInDecreasingOrder={() => setSortInDecreasingOrder((prev) => !prev)}
        sortInDecreasingOrder={sortInDecreasingOrder}
        checked={checked}
        checkedAll={chechedAll}
        onCheckAll={() => {
          setCheckedAll((prev) => {
            const isChecked = !prev;
            if (isChecked) setChecked(aggregatedCards.map((_, index) => index));
            else setChecked([]);
            return isChecked;
          });
        }}
      />
      <FlatList
        data={aggregatedCards}
        renderItem={({ item, index }) => (
          <DeckTableRow
            {...item}
            index={index}
            isChecked={checked.includes(index)}
            onCheck={(value, index) => {
              if (value) setChecked((prev) => [...prev, index]);
              else setChecked((prev) => prev.filter((idx) => index !== idx));
            }}
          />
        )}
        keyExtractor={(item, index) => item.sourceText + index}
      />
    </View>
  );
};

const s = StyleSheet.create({
  tableWrapper: {
    flex: 1,
    borderRadius: 5,
    borderColor: color.chocolate,
    borderWidth: 2,
  },
});
