import { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ICard } from "shared/models";
import { color, font } from "shared/vars";
import Checkbox from "expo-checkbox";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = ICard & {
  onCheck: (value: boolean, index: number) => void;
  index: number;
  isChecked: boolean;
  deckName: string;
};

const TRANSLATED_TEXT_LENGTH_LIMIT = 28;

export const DeckTableRow: FC<Props> = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const navigator = useNavigation();

  useEffect(() => {
    setIsChecked(props.isChecked);
  }, [props.isChecked]);

  const translatedText = useMemo(() => {
    let text = props.translations[0];
    let i = 1;
    while (i < props.translations.length) {
      if (text.length + props.translations[i].length <= TRANSLATED_TEXT_LENGTH_LIMIT) {
        text += ", " + props.translations[i++];
      } else {
        text += "...";
        break;
      }
    }
    return text;
  }, [props.translations]);

  return (
    <TouchableOpacity
      testID="card-row"
      onPress={() => {
        navigator.navigate("Card", {
          cardId: props.cardId,
          deckName: props.deckName,
        });
      }}
      style={s.container}>
      <View style={s.checkboxCol}>
        <View style={s.chechBoxView}>
          <Checkbox
            testID="card-row-checkbox"
            style={s.checkbox}
            value={isChecked}
            color={isChecked ? color.chocolate : undefined}
            onValueChange={() => {
              setIsChecked((prev) => {
                props.onCheck(!prev, props.index);
                return !prev;
              });
            }}
          />
        </View>
      </View>
      <View style={s.source}>
        <Text style={s.label}>{props.sourceText}</Text>
      </View>
      <View style={s.translated}>
        <Text style={s.label}>{translatedText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderColor: color.chocolate,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  checkboxCol: {
    width: "10%",
    marginRight: 10,
  },
  chechBoxView: {
    width: 35,
    height: 35,
    borderWidth: 2,
    borderColor: color.dimgrey,
    borderRadius: 8,
  },
  checkbox: {
    borderRadius: 6,
    width: "100%",
    height: "100%",
    borderWidth: 0,
  },
  source: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
  },
  translated: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  label: {
    textAlign: "left",
    width: "100%",
    fontFamily: font.Montserrat.regular,
    fontSize: 14,
  },
  buttons: {
    width: "20%",
  },
});
