import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { color, font } from "shared/vars";
import { useDeckScreenContext } from "./context";

export const HomeDeckListHeader = () => {
  const [inputSearchShow, setInputSearchShown] = useState<boolean>(false);
  const { searchDeckInput, onSearhDeckInput } = useDeckScreenContext();
  const navigation = useNavigation();

  return (
    <View style={s.head}>
      {inputSearchShow ? (
        <View style={s.searchInput}>
          <MDIcon name="search" size={25} />
          <TextInput
            onChangeText={onSearhDeckInput}
            value={searchDeckInput}
            style={{ flex: 1, fontFamily: font.Montserrat.medium, fontSize: 20 }}
          />
          <Pressable
            onPress={() => {
              onSearhDeckInput("");
              setInputSearchShown(false);
            }}>
            <MDIcon name="close" size={25} />
          </Pressable>
        </View>
      ) : null}
      <View style={[s.buttons, inputSearchShow ? null : { position: "absolute", right: 10, top: 10 }]}>
        <Pressable
          style={s.btn}
          onPress={() => {
            setInputSearchShown((previous) => !previous);
            onSearhDeckInput("");
          }}>
          <MDIcon name="search" size={35} />
        </Pressable>
        <Pressable
          style={s.btn}
          onPress={() => {
            navigation.navigate("CreateDeck");
          }}>
          <MDIcon name="add" size={35} />
        </Pressable>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  head: {
    width: "100%",
    height: 60,
    elevation: 10,
    padding: 10,
    columnGap: 10,
    position: "absolute",
    top: 0,
    flexDirection: "row",
    backgroundColor: color.whitesmoke,
  },
  searchInput: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "black",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",

    columnGap: 5,
  },
  buttons: {
    // alignSelf: "center",
    flexDirection: "row",
    columnGap: 10,
  },
  btn: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
  },
});
