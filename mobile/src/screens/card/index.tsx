import { NavigationProp, RouteProp } from "@react-navigation/native";
import { DeckStackParamList } from "app/navigation/deck.stack";
import { FC, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { useLingoCard, useLingoDeck } from "shared/models";
import { Container } from "shared/ui";
import { color, font } from "shared/vars";

type CreateNewTranslateInputProps = {
  addText: (text: string) => void;
};

const CreateNewTranslateInput: FC<CreateNewTranslateInputProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState("");
  const inputRef = useRef<TextInput | null>(null);

  return (
    <View style={translation.card}>
      {isOpen ? (
        <View
          style={{
            borderRadius: 8,
            borderWidth: 2,
            borderColor: "black",
            width: "100%",
            height: 40,
            flexDirection: "row",
          }}>
          <TextInput
            style={{ flex: 1, fontSize: 16, fontFamily: font.Montserrat.regular, paddingHorizontal: 6 }}
            value={text}
            autoCapitalize="none"
            autoFocus
            onChangeText={(text) => setText(text)}
            ref={inputRef}
          />
          {text.length ? (
            <TouchableOpacity
              onPress={() => {
                props.addText(text);
                setText("");
                setIsOpen(false);
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderLeftWidth: 2,
                backgroundColor: "green",
                borderLeftColor: "black",
                height: "100%",
                width: 38,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              }}>
              <MDIcon name="done" color={color.whitesmoke} style={{ borderRadius: 10 }} size={30} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderLeftWidth: 2,
                borderLeftColor: "black",
                height: "100%",
                width: 38,
                backgroundColor: "tomato",
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              }}>
              <MDIcon name="close" color={color.whitesmoke} size={30} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <TouchableOpacity
          style={translation.button}
          onPress={() => {
            setIsOpen((prev) => !prev);
          }}>
          <MDIcon name="add" size={25} />
        </TouchableOpacity>
      )}
    </View>
  );
};

type CardScreenProps = {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  route: RouteProp<DeckStackParamList, "Card">;
};

export default function CardScreen({ navigation, route }: CardScreenProps) {
  const { deleteCards } = useLingoDeck(route.params.deckName);
  const { card, deleteTranslation, pushTranslation } = useLingoCard(route.params.deckName, route.params.cardId);

  return (
    <Container>
      <View style={header.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[header.headerButton, { left: 20 }]}>
          <MDIcon name="arrow-back" size={30} />
        </TouchableOpacity>
        <Text style={header.title}>Edit Lingo card</Text>
        <TouchableOpacity
          onPress={async () => {
            if (!card) return;

            await deleteCards(card);
            navigation.goBack();
          }}
          style={[header.headerButton, { right: 20 }]}>
          <MDIcon name="delete" size={30} />
        </TouchableOpacity>
      </View>
      <View style={main.root}>
        <View style={main.section}>
          <Text style={main.labelParagraph}>Original text: </Text>
          <View style={main.originalTextWrapper}>
            <Text style={main.originalText}>{card?.sourceText}</Text>
          </View>
        </View>
        <View style={[main.section, { flex: 1, marginTop: 30 }]}>
          <Text style={main.labelParagraph}>Translations:</Text>
          <FlatList
            style={translation.wrapper}
            data={card ? ["blank", ...card.translations] : null}
            renderItem={({ item: translatedText, index }) => {
              if (index === 0) {
                return <CreateNewTranslateInput addText={pushTranslation} />;
              }
              return (
                <View style={translation.card} key={translatedText}>
                  <TouchableOpacity style={translation.button} onPress={() => deleteTranslation(index - 1)}>
                    <MDIcon name="delete" size={25} />
                  </TouchableOpacity>
                  <Text style={{ fontFamily: font.Montserrat.regular, fontSize: 18 }}>{translatedText}</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => (item ? item : index.toString())}
          />
        </View>
      </View>
    </Container>
  );
}

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
  headerButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
  },
});

const main = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    marginTop: 60,
    padding: 10,
  },
  section: {
    width: "100%",
  },
  labelParagraph: {
    fontFamily: font.Montserrat.regular,
    fontSize: 18,
  },
  originalTextWrapper: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.burlywood,
    padding: 10,
    marginTop: 10,
    // backgroundColor: color.lightgrey,
  },
  originalText: {
    fontSize: 20,
    fontFamily: font.Montserrat.medium,
    color: color.chocolate,
  },
});

const translation = StyleSheet.create({
  wrapper: {
    padding: 20,
    marginTop: 10,
    borderRadius: 8,
    borderColor: color.burlywood,
    rowGap: 15,
    borderWidth: 2,
    flex: 1,
    height: "100%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  card: {
    width: "100%",
    padding: 8,
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
  },
});
