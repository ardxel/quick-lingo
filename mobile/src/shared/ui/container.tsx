import { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import { StyleProp, StyleSheet, View } from "react-native";
import { color } from "share/vars";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Container = ({ style, children }: PropsWithChildren<Props>) => {
  return <View style={[s.container, style]}>{children}</View>;
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: color.cornsilk,
  },
});
