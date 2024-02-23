import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { DeckStackParamList } from "app/navigation/deck.stack";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { ResponsePayloadTranslations, api } from "shared/api";
import { IDeck, useLingoDeck } from "shared/models";
import { Container } from "shared/ui";
import { color, font } from "shared/vars";
import { DeckTable } from "features/deckTable";
import { Keyboard } from "react-native";
import { useRenderForce } from "shared/hooks";

type RequestTranslateBody = {
  sourceLanguageCode: string;
  targetLanguageCode: string;
  texts: string[];
};

type EditDeckScreenProps = {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  route: RouteProp<DeckStackParamList, "EditDeck">;
};

const EditDeckScreen = ({ route }: EditDeckScreenProps) => {
  const { deck, addCard } = useLingoDeck(route.params.editableDeckName);
  const [texts, setTexts] = useState<string>("");
  const [inputSearchCard, setInputSearchCard] = useState<string>("");
  const [renderKey, renderTable] = useRenderForce();

  const REQUEST_MIN_WORD_LENGTH = 2;
  const disableTranslateButton = texts.length < REQUEST_MIN_WORD_LENGTH;

  const { mutateAsync: translateAsync, isPending } = useMutation({
    mutationFn: (body: RequestTranslateBody) => api.post<ResponsePayloadTranslations>("yc/translate-gpt", body),
  });

  const translate = async () => {
    if (!deck) return;

    Keyboard.dismiss();
    try {
      const response = await translateAsync({
        sourceLanguageCode: deck.sourceLanguage,
        targetLanguageCode: deck.targetLanguage,
        texts: texts.split(" "),
      });

      const translations = response.data.payload.translations.texts;

      addCard({
        sourceText: texts,
        translations: translations,
        expanded: false,
        createdAt: new Date(),
        playCount: 0,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTexts("");
      renderTable();
    }
  };
  console.log("TOSORTED: ", Array.prototype.toSorted);
  return (
    <Container>
      <View style={header.wrapper}>
        <Text style={header.title}>{route.params.editableDeckName}</Text>
        <Text
          style={{
            fontFamily: font.Montserrat.medium,
            fontSize: 16,
          }}>{`${deck?.sourceLanguage}➞${deck?.targetLanguage}`}</Text>
      </View>
      <View style={root.container}>
        <View style={root.section}>
          <View style={root.inputWithLabel}>
            <Text style={root.label}>
              Field for entering a new word.
              <Text style={[root.label, { fontFamily: font.Montserrat.medium }]}>
                {` (Min length: ${REQUEST_MIN_WORD_LENGTH})`}
              </Text>
            </Text>
            <View style={root.inputView}>
              <TextInput
                placeholder="insert new text"
                value={texts}
                onChangeText={(text) => setTexts(text)}
                style={[
                  root.input,
                  disableTranslateButton ? null : { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                ]}
              />
              {disableTranslateButton || isPending ? null : (
                <TouchableHighlight
                  style={root.inputIconButton}
                  onPress={() => translate()}
                  disabled={disableTranslateButton || isPending}>
                  <MDIcon
                    name="check"
                    size={25}
                    color={disableTranslateButton ? "black" : color.chocolate}
                    style={[root.inputIcon]}
                  />
                </TouchableHighlight>
              )}
              {isPending ? (
                <View style={root.inputIconButton}>
                  <ActivityIndicator size={25} color={color.chocolate} />
                </View>
              ) : null}
            </View>
          </View>
          <View style={root.inputView}>
            <TextInput value={inputSearchCard} onChangeText={(text) => setInputSearchCard(text)} style={root.input} />
          </View>
          <DeckTable
            // key={renderKey}
            deck={deck || ([] as IDeck)}
            deckName={route.params.editableDeckName}
            inputSearchCard={inputSearchCard}
          />
        </View>
      </View>
    </Container>
  );
};

const header = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 60,
    backgroundColor: color.whitesmoke,
    elevation: 10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
  },
  title: {
    fontFamily: font.Montserrat.medium,
    fontSize: 26,
  },
});

const root = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 60,
    padding: 10,
  },
  section: {
    width: "100%",
    height: "100%",
    rowGap: 30,
  },
  inputView: {
    flexDirection: "row",
    position: "relative",
    width: "100%",
    height: 50,
  },
  inputWithLabel: {
    rowGap: 10,
    width: "100%",
  },
  inputIconButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 2,
    width: 50,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderColor: color.chocolate,
    backgroundColor: color.cornsilk,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  inputIcon: {},
  input: {
    borderColor: color.chocolate,
    borderWidth: 2,
    flex: 1,
    borderRadius: 10,
    height: "100%",
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontFamily: font.Montserrat.regular,
  },
  label: {
    fontFamily: font.Montserrat.regular,
    fontSize: 14,
  },
});

export default EditDeckScreen;
