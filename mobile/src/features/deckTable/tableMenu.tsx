import Checkbox from "expo-checkbox";
import { FC, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { color } from "shared/vars";

export const sortByOption = ["New", "Alphabet", "Play count", "Useful"] as const;
export type DeckTableSortOption = (typeof sortByOption)[number];

type Props = {
  deleteCards: () => void;
  onCheckAll: () => void;
  sortInDecreasingOrder: boolean;
  toggleSortInDecreasingOrder: () => void;
  onSelectSortOption: (type: DeckTableSortOption) => void;
  checkedAll: boolean;
  checked: number[];
  setPage: (index: number) => void;
  currentPage: number;
  totalPages: number;
};

export const DeckTableMenu: FC<Props> = (props) => {
  const [selectedSortOptions, setSelectedSortOptions] = useState(sortByOption[0]);

  return (
    <View style={s.tableHeader}>
      <View style={[s.section, { columnGap: 10 }]}>
        <View style={s.checkboxView}>
          <Checkbox
            style={s.checkbox}
            onValueChange={props.onCheckAll}
            value={props.checkedAll}
            color={props.checkedAll ? color.chocolate : "inherit"}
          />
        </View>
        <TouchableOpacity
          disabled={props.checked.length < 1}
          onPress={props.deleteCards}
          style={[
            s.button,
            props.checked.length ? { borderWidth: 2, backgroundColor: color.chocolate } : { borderWidth: 0 },
          ]}>
          <MDIcon name={"delete"} size={28} color={props.checked ? color.whitesmoke : color.whitesmoke} />
        </TouchableOpacity>
      </View>
      <View style={[s.section, { width: "40%" }]}>
        <Pressable style={[s.button, { borderWidth: 0 }]} onPress={props.toggleSortInDecreasingOrder}>
          <MDIcon name={props.sortInDecreasingOrder ? "south" : "north"} color={color.whitesmoke} size={28} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <SelectDropdown
            // @ts-ignore
            data={sortByOption}
            onSelect={(item) => {
              setSelectedSortOptions(item);
              props.onSelectSortOption(item);
            }}
            defaultValue={selectedSortOptions}
            statusBarTranslucent={true}
            buttonStyle={{
              width: "100%",
              height: "100%",
              borderRadius: 8,
              backgroundColor: color.cornsilk,
            }}
            dropdownStyle={{
              backgroundColor: color.cornsilk,
              borderRadius: 8,
            }}
            rowTextStyle={{
              fontSize: 14,
            }}
            buttonTextStyle={{
              fontSize: 14,
            }}
            renderDropdownIcon={() => <MDIcon name="expand-more" size={20} />}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", height: "100%" }}>
        <TouchableOpacity
          onPress={() => props.setPage(Math.max(props.currentPage - 1, 1))}
          style={[s.button, { borderWidth: 0, width: 45, height: 45, padding: 0 }]}>
          <MDIcon name="chevron-left" size={45} color={props.currentPage === 1 ? color.dimgrey : color.whitesmoke} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.setPage(Math.min(props.currentPage + 1, props.totalPages))}
          style={[s.button, { borderWidth: 0, width: 45, height: 45, padding: 0 }]}>
          <MDIcon
            name="chevron-right"
            size={45}
            color={props.currentPage === props.totalPages ? color.dimgrey : color.whitesmoke}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    height: 50,
    padding: 5,
    width: "100%",
    columnGap: 10,
    backgroundColor: color.burlywood,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomWidth: 2,
    borderColor: color.chocolate,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxView: {
    borderColor: color.whitesmoke,
    borderWidth: 2,
    borderRadius: 8,
    width: 35,
    height: 35,
  },
  checkbox: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
    borderWidth: 0,
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: 8,
    borderColor: color.whitesmoke,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
