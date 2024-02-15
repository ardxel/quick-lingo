import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ChangeEvent, FC, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BaseResponse, LanguageList, ResponsePayloadLanguageList } from "shared/api";
import { color, font } from "shared/vars";

type Props = {
  onSelect: (e: string | ChangeEvent<any>) => void;
};

export const SelectCountry: FC<Props> = ({ onSelect }) => {
  const langs = useSupportedLanguages();
  if (!langs) {
    return (
      <View style={[s.selectButtonStyle, { height: 50, justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontFamily: font.Montserrat.medium, fontSize: 20, color: color.dimgrey }}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <SelectDropdown
        data={langs}
        onSelect={(lang) => {
          onSelect(lang.code);
        }}
        defaultValue={langs[0]}
        renderCustomizedButtonChild={renderCountryItem}
        renderCustomizedRowChild={renderCountryItem}
        dropdownStyle={{
          borderRadius: 10,
          borderWidth: 2,
          borderColor: color.chocolate,
        }}
        statusBarTranslucent={true}
        buttonStyle={s.selectButtonStyle}
        renderDropdownIcon={() => <Icon name="expand-more" size={20} />}
      />
    </>
  );
};

const s = StyleSheet.create({
  selectButtonStyle: {
    width: "100%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: color.chocolate,
    backgroundColor: color.whitesmoke,
  },
});

function renderCountryItem(languageObject: LanguageList[0], index: number): ReactNode {
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

function useSupportedLanguages(): ResponsePayloadLanguageList["languages"] | undefined {
  const qClient = useQueryClient();
  const qData = qClient.getQueryData<any, any, AxiosResponse<BaseResponse<ResponsePayloadLanguageList>>>(["languages"]);

  const languages = qData?.data?.payload?.languages;

  return languages;
}
