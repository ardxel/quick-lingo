import { DeckItem } from "entities/deck";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useLingoDeckMap } from "shared/models";
import { Container } from "shared/ui";
import { color } from "shared/vars";
import { useDeckScreenContext } from ".";

export const HomeDeckScreenDeckList = () => {
  const { deckMap, removeDeck } = useLingoDeckMap();
  const { searchDeckInput } = useDeckScreenContext();

  const filteredDeckItems = useMemo(
    () => (deckMap ? Object.values(deckMap).filter((deckData) => deckData.name.includes(searchDeckInput)) : []),
    [deckMap, searchDeckInput],
  );

  if (!deckMap) {
    return (
      <Container>
        <ActivityIndicator size={70} color={color.chocolate} />
      </Container>
    );
  }

  return (
    <FlatList
      style={deckListStyles.wrapperFlatList}
      /* filter decks by user input */
      data={filteredDeckItems}
      renderItem={({ item: deck }) => <DeckItem deck={deck} removeMe={removeDeck} />}
      keyExtractor={(deck) => deck.name}
    />
  );
};

const deckListStyles = StyleSheet.create({
  wrapperFlatList: {
    marginTop: 60,
    width: "100%",
  },
});
