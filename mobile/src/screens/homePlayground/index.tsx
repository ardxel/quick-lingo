import { NavigationProp, RouteProp, useFocusEffect } from "@react-navigation/native";
import { RootTabParamList } from "app/navigation";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import MDIcon from "react-native-vector-icons/MaterialIcons";
import { useLingoDeckMap } from "shared/models";
import { Container } from "shared/ui";
import { color, font } from "shared/vars";

type PlaygroundScreenProps = {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  route: RouteProp<RootTabParamList, "Play">;
};

export default function HomePlaygroundScreen(props: PlaygroundScreenProps) {
  const [selectedDeck, setSelectedDeck] = useState<string>();
  const { deckMap, isLoading } = useLingoDeckMap();

  const deckNames = useMemo(() => {
    return Object.keys(deckMap);
  }, [deckMap]);

  useFocusEffect(useCallback(() => setSelectedDeck(deckNames[0]), [deckNames]));

  if (isLoading) return null;

  return (
    <Container>
      <View style={root.section}>
        <Text style={root.title}>Select deck</Text>
        <SelectDropdown
          data={deckNames}
          onSelect={(deckName) => setSelectedDeck(deckName)}
          defaultValue={deckNames[0]}
          statusBarTranslucent={true}
          renderCustomizedRowChild={(name) => {
            const deck = deckMap[name];
            return (
              <View style={{ alignItems: "center", padding: 4, flex: 1, rowGap: 4 }}>
                <Text style={[root.rowParagraph, { fontSize: 17 }]}>{name}</Text>
                <Text style={root.rowParagraph}>{`${deck.sourceLanguage}➞${deck.targetLanguage}`}</Text>
                <Text style={root.rowParagraph}>cards: {deck.cards.length}</Text>
              </View>
            );
          }}
          buttonStyle={{
            width: "50%",
            borderRadius: 8,
            backgroundColor: color.cornsilk,
            borderWidth: 2,
            borderColor: color.chocolate,
          }}
          dropdownStyle={{
            backgroundColor: color.cornsilk,
            borderRadius: 8,
          }}
          rowStyle={{
            height: 70,
          }}
          buttonTextStyle={{
            fontSize: 18,
            fontFamily: font.Montserrat.medium,
          }}
          renderDropdownIcon={() => <MDIcon name="expand-more" size={20} />}
        />
        <TouchableOpacity
          style={root.buttonPlay}
          onPress={() => {
            if (!selectedDeck) return;
            props.navigation.navigate("Playground", { deckName: selectedDeck });
          }}>
          <Text style={[root.rowParagraph, { fontSize: 16 }]}>Play</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const root = StyleSheet.create({
  section: {
    rowGap: 20,
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    fontFamily: font.Montserrat.medium,
    fontSize: 20,
  },
  rowParagraph: {
    fontFamily: font.Montserrat.medium,
  },
  buttonPlay: {
    padding: 8,
    borderColor: color.chocolate,
    backgroundColor: color.whitesmoke,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 100,
  },
});
