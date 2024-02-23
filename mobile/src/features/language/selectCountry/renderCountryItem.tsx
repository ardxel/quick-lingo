import { ReactNode } from "react";
import { View, Text } from "react-native";
import CountryFlag from "react-native-country-flag";
import { LanguageList } from "shared/api";
import { font } from "shared/vars";

export function renderCountryItem(languageObject: LanguageList[0], _index: number): ReactNode {
  // dont touch it
  if (!languageObject) return null;

  const { code, name } = languageObject;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        columnGap: 10,
        paddingHorizontal: 10,
      }}>
      <CountryFlag isoCode={code} size={25} />
      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
        <Text style={{ fontFamily: font.Montserrat.regular }}>{code.toUpperCase()}</Text>
        {name ? <Text style={{ fontFamily: font.Montserrat.regular, marginLeft: 20 }}>{name}</Text> : null}
      </View>
    </View>
  );
}
