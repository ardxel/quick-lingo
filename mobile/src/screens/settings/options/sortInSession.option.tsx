import { sortByOption } from "features/deckTable/tableMenu";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { SortCardsInSessionOption } from "shared/store";
import { color, font } from "shared/vars";

const sortCardsInSessionOptions = ["Random", ...sortByOption] as const;

type Props = {
  onSelectSortOption: (sortOption: SortCardsInSessionOption) => void;
  value: SortCardsInSessionOption;
};

export const SortCardsOption: FC<Props> = (props) => {
  return (
    <View style={s.wrapper}>
      <Text style={s.paragraph}>Sort cards in session:</Text>
      <SelectDropdown
        // @ts-ignore
        data={sortCardsInSessionOptions}
        onSelect={(opt) => props.onSelectSortOption(opt)}
        defaultValueByIndex={Math.max(sortCardsInSessionOptions.indexOf(props.value), 0)}
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
};

const s = StyleSheet.create({
  wrapper: {
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
