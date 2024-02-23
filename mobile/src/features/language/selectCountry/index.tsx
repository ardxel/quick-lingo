import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getLocales } from "expo-localization";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BaseResponse, LanguageList, ResponsePayloadLanguageList } from "shared/api";
import { color, font } from "shared/vars";
import { renderCountryItem } from "./renderCountryItem";

type Props = {
  onSelect: (e: string | ChangeEvent<any>) => void;
  selectLocationType?: "main" | "other";
};

export const SelectCountry: FC<Props> = ({ onSelect, selectLocationType }) => {
  const languageList = useSupportedLanguages();
  const [defaultValue, setDefaultValue] = useState<LanguageList[0] | undefined>();

  useEffect(() => {
    if (!languageList) return;

    setDefaultValue(() => {
      const value = selectLocationType
        ? selectDefaultLanguageByUserLocation(languageList, selectLocationType === "main")
        : languageList[0];

      onSelect(value.code);

      return value;
    });
  }, [languageList]);

  if (!languageList) {
    return (
      <View style={[s.selectButtonStyle, { height: 50, justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontFamily: font.Montserrat.medium, fontSize: 20, color: color.dimgrey }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SelectDropdown
      data={languageList}
      onSelect={(lang) => onSelect(lang.code)}
      defaultValue={defaultValue}
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

function useSupportedLanguages(): ResponsePayloadLanguageList["languages"] | undefined {
  const qClient = useQueryClient();
  const qData = qClient.getQueryData<any, any, AxiosResponse<BaseResponse<ResponsePayloadLanguageList>>>(["languages"]);

  const languages = qData?.data?.payload?.languages;

  return languages;
}

function selectDefaultLanguageByUserLocation(languages: LanguageList, useMainLocation = true): LanguageList[0] {
  const locales = getLocales();

  if (!locales.length) return languages[0];

  let index = 0;

  if (useMainLocation) {
    index = languages.findIndex((langData) => langData.code === locales[0].languageCode);
  } else {
    const sliced = locales.slice(1);
    index = languages.findIndex((langData) => sliced.find((loc) => loc.languageCode === langData.code));
  }

  index === Math.max(index, 0);

  return languages[index];
}
