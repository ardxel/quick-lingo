import { useLingoDeckMap } from "entities/deck";
import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { color, font } from "shared/vars";

type Props = {
  onSelectBasicDeck: (deckName: string) => void;
  value: string | undefined | null;
};

export const SelectBasicDeckOption: FC<Props> = memo((props) => {
  const { deckMap } = useLingoDeckMap();

  const deckNames = Object.keys(deckMap);

  if (!deckNames.length) return null;

  return (
    <View style={s.basicDeckSelector}>
      <Text style={s.paragraph}>Select basic deck: </Text>
      <SelectDropdown
        data={deckNames}
        onSelect={(deckName) => props.onSelectBasicDeck(deckName)}
        defaultValue={props.value ? props.value : deckNames[0]}
        statusBarTranslucent={true}
        buttonStyle={{
          width: "40%",
          height: 40,
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
          height: 50,
        }}
        buttonTextStyle={{
          fontSize: 14,
          fontFamily: font.Montserrat.medium,
        }}
        renderDropdownIcon={() => <MDIcon name="expand-more" size={20} />}
      />
    </View>
  );
});

const s = StyleSheet.create({
  basicDeckSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paragraph: {
    fontSize: 20,
    textAlign: "left",
    fontFamily: font.Montserrat.regular,
  },
});
