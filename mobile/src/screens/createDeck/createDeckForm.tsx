import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useLingoDeckMap } from "entities/deck";
import { SelectCountry } from "features/language";
import { Formik } from "formik";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ResponsePayloadLanguageList, api } from "shared/api";
import { Container } from "shared/ui";
import { color, font } from "shared/vars";

export const CreateDeckForm = () => {
  useQuery({
    queryKey: ["languages"],
    queryFn: () => api.get<ResponsePayloadLanguageList>("yc/languages"),
    select: (response) => response.data.payload.languages,
  });
  const { deckMap, update: updateDeckMap } = useLingoDeckMap();
  const navigation = useNavigation();

  return (
    <Formik
      validate={async (values) => {
        const errors: { [P in keyof typeof values]?: string } = {};

        if (!values.deckName || values.deckName.length < 4) {
          errors.deckName = "deck name must have 4 symbols";
        }

        if (values.deckName.length > 10) {
          errors.deckName = "deck name length limit 10 symbols";
        }

        if (deckMap && Object.keys(deckMap).includes(values.deckName)) {
          errors.deckName = "deck with this name is already exist";
        }

        if (!values.sourceLanguage) {
          errors.sourceLanguage = "select source language";
        }

        if (!values.targetLanguage) {
          errors.targetLanguage = "select target language";
        }

        return errors;
      }}
      onSubmit={async (values) => {
        if (!deckMap) return;

        deckMap[values.deckName] = {
          sourceLanguage: values.sourceLanguage,
          targetLanguage: values.targetLanguage,
          name: values.deckName,
          lastPlayed: new Date(),
          cards: [],
        };

        await updateDeckMap(deckMap);

        navigation.navigate("Deck", {
          screen: "HomeDeckList",
        });
      }}
      initialValues={{
        deckName: "",
        sourceLanguage: "",
        targetLanguage: "",
      }}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Container style={s.container}>
          <View style={s.title}>
            <Text style={{ fontSize: 30, fontFamily: font.Montserrat.bold, color: color.dimgrey }}>
              Create new deck
            </Text>
          </View>
          <View style={[s.inputBlock, { alignSelf: "flex-start", width: "100%" }]}>
            <Text style={s.inputLabel}>Enter deck name</Text>
            <TextInput
              style={s.input}
              placeholder={"Deck name"}
              onChangeText={handleChange("deckName")}
              onBlur={handleBlur("deckName")}
              value={values.deckName}
            />
          </View>

          <View style={s.inputBlock}>
            <Text style={s.inputLabel}>Select source language</Text>
            <SelectCountry selectLocationType="main" onSelect={handleChange("sourceLanguage")} />
          </View>
          <View style={s.inputBlock}>
            <Text style={s.inputLabel}>Select target language</Text>
            <SelectCountry selectLocationType="other" onSelect={handleChange("targetLanguage")} />
          </View>
          <TouchableOpacity style={s.submit} onPress={() => handleSubmit()}>
            <Text style={{ fontFamily: font.Montserrat.bold, color: color.dimgrey, fontSize: 18 }}>Create</Text>
          </TouchableOpacity>
        </Container>
      )}
    </Formik>
  );
};

const s = StyleSheet.create({
  title: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    rowGap: 25,
    padding: 20,
    width: "100%",
  },
  inputBlock: {
    rowGap: 8,
    width: "100%",
  },
  inputLabel: {
    fontFamily: font.Montserrat.medium,
    fontSize: 18,
    color: color.dimgrey,
  },
  input: {
    borderColor: color.chocolate,
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: font.Montserrat.regular,
    padding: 10,
    width: "100%",
    backgroundColor: color.whitesmoke,
    color: color.dimgrey,
    fontSize: 16,
  },
  submit: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    minWidth: 100,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: font.Montserrat.medium,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.chocolate,
    backgroundColor: color.whitesmoke,
    color: color.dimgrey,
  },
});
