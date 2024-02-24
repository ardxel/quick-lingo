import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { DeckStackParamList } from "app/navigation/deck.stack";
import { DeckTable } from "features/deckTable";
import { FC, useState } from "react";
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import uuid from "react-native-uuid";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { ResponsePayloadTranslations, api } from "shared/api";
import { useRenderForce } from "shared/hooks";
import { useLingoDeck } from "shared/models";
import { Container } from "shared/ui";
import { color, font } from "shared/vars";

type CreateCardTextInputProps = {
  texts: string;
  disabled: boolean;
  isPending: boolean;
  minTextLength: number;
  translate: () => void;
  setTexts: (texts: string) => void;
};

const CreateCardTextInput: FC<CreateCardTextInputProps> = (props) => {
  return (
    <View style={root.inputWithLabel}>
      <Text style={root.label}>
        Field for entering a new word.
        <Text style={[root.label, { fontFamily: font.Montserrat.medium }]}>
          {` (Min length: ${props.minTextLength})`}
        </Text>
      </Text>
      <View style={root.inputView}>
        <TextInput
          placeholder="insert new text"
          value={props.texts}
          autoCapitalize="none"
          onChangeText={(text) => props.setTexts(text)}
          style={[root.input, props.disabled ? null : { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
        />
        {props.disabled || props.isPending ? null : (
          <TouchableHighlight
            style={root.inputIconButton}
            onPress={() => props.translate()}
            disabled={props.disabled || props.isPending}>
            <MDIcon
              name="check"
              size={25}
              color={props.disabled ? "black" : color.chocolate}
              style={[root.inputIcon]}
            />
          </TouchableHighlight>
        )}
        {props.isPending ? (
          <View style={root.inputIconButton}>
            <ActivityIndicator size={25} color={color.chocolate} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

type SearchCardInputProps = {
  input: string;
  onChangeText: (text: string) => void;
};

const SearchCardInput: FC<SearchCardInputProps> = (props) => {
  return (
    <View style={root.inputWithLabel}>
      <Text style={root.label}>Search card</Text>
      <View style={root.inputView}>
        <TextInput
          placeholder="search card"
          value={props.input}
          onChangeText={(text) => props.onChangeText(text)}
          style={root.input}
        />
      </View>
    </View>
  );
};

export type RequestTranslateBody = {
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
        texts: texts.trim().split(" "),
      });

      const translations = response.data.payload.translations.texts;

      addCard({
        sourceText: texts,
        translations: translations,
        expanded: false,
        createdAt: new Date(),
        playCount: 0,
        cardId: uuid.v4() as string,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTexts("");
      renderTable();
    }
  };

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
          <CreateCardTextInput
            translate={translate}
            isPending={isPending}
            disabled={disableTranslateButton}
            texts={texts}
            setTexts={(texts) => setTexts(texts)}
            minTextLength={REQUEST_MIN_WORD_LENGTH}
          />
          <SearchCardInput onChangeText={setInputSearchCard} input={inputSearchCard} />
          <DeckTable key={renderKey} deckName={route.params.editableDeckName} inputSearchCard={inputSearchCard} />
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
    rowGap: 8,
  },
  inputView: {
    flexDirection: "row",
    position: "relative",
    width: "100%",
    height: 45,
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
