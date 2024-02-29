import { FC } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { color, font } from "shared/vars";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export const ShowCardsCountOption: FC<Props> = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.paragraph}>Show cards count: </Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Switch
          style={{ transform: [{ scale: 1.2 }] }}
          trackColor={{ true: color.lightgrey, false: color.darkgrey }}
          thumbColor={props.value ? color.chocolate : color.dimgrey}
          value={props.value}
          onValueChange={props.onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
