import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { color, font } from "shared/vars";
import { IDeck } from "../deck.interface";

type Props = {
  deck: IDeck;
  removeMe: (deckName: string) => void;
};

export const DeckItem: FC<Props> = ({ deck, removeMe }) => {
  const { navigate } = useNavigation();

  const navigateToEditDeckScreen = () => navigate("EditDeck", { editableDeckName: deck.name });

  return (
    <TouchableOpacity
      style={s.container}
      onPress={() => {
        navigate("Play", { screen: "Playground", params: { deckName: deck.name } });
      }}>
      <>
        <View>
          <View style={{ flexDirection: "row", alignItems: "flex-end", columnGap: 6 }}>
            <Text style={s.title}>{deck.name}</Text>
            <Text
              style={{
                fontFamily: font.Montserrat.medium,
                fontSize: 16,
              }}>{`${deck.sourceLanguage}➞${deck.targetLanguage}`}</Text>
          </View>
          <Text style={s.countCards}>{`${deck.cards.length} cards`}</Text>
        </View>
        <View style={s.buttons}>
          <TouchableOpacity onPress={navigateToEditDeckScreen} style={[s.iconButton, s.editBtn]}>
            <MDIcon name="edit-note" size={30} color={"gold"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(`Delete ${deck.name}`, `Are you sure you want to delete ${deck.name} deck?`, [
                { text: "yes", onPress: () => removeMe(deck.name), style: "destructive" },
                { text: "no", style: "cancel" },
              ]);
            }}
            style={[s.iconButton, s.deleteBtn]}>
            <MDIcon name="delete" size={30} color="crimson" />
          </TouchableOpacity>
        </View>
      </>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    padding: 12,
    borderBottomColor: color.chocolate,
    borderBottomWidth: 2,
    backgroundColor: color.burlywood,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  iconButton: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
  },
  playBtn: { borderColor: "green", backgroundColor: color.whitesmoke },
  editBtn: { borderColor: "gold", backgroundColor: color.chocolate },
  deleteBtn: { borderColor: "crimson", backgroundColor: color.cornsilk },

  title: {
    fontSize: 24,
    fontFamily: font.Montserrat.bold,
    flexWrap: "wrap",
  },
  countCards: {
    fontSize: 16,
    fontFamily: font.Montserrat.regular,
  },
});
