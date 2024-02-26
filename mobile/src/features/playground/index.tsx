import { FC, memo, useEffect, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { Container } from "shared/ui";
import { font } from "shared/vars";
import { answer, header, root } from "./styles";
import { useQuickLingoGameManager } from "./useQuickLingoGameManager";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type Props = {
  deckName: string;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

export const Playground: FC<Props> = (props) => {
  const gameManager = useQuickLingoGameManager(props.deckName);
  const [showAnswer, setShowAnswer] = useState(false);
  const navigation = useNavigation();

  const getNextCard = () => {
    gameManager.popCard();
    setShowAnswer(false);
  };

  if (!gameManager.hasNext) {
    return (
      <Container>
        <View style={root.main}>
          <Text style={answer.buttonShowAnswerText}>Nothing to learn</Text>
          <TouchableOpacity style={answer.buttonAnswer} onPress={() => navigation.goBack()}>
            <Text style={[answer.buttonShowAnswerText, { textAlign: "center" }]}>Go back</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container style={{ width: "100%", height: "100%", alignItems: "center" }}>
      <View style={header.header}>
        <View style={header.counter}>
          <Text style={header.counterParagraph}>{`${gameManager.currentCardIndex} / ${gameManager.cardsCount}`}</Text>
        </View>
      </View>
      <View style={root.main}>
        <AnimatedTitle text={gameManager.currentCard!.sourceText} />
        <View style={answer.displayAnswer}>
          {showAnswer && gameManager.currentCard
            ? gameManager.currentCard.translations.map((translatedText) => (
                <Text style={answer.translatedText} key={translatedText}>
                  {translatedText}
                </Text>
              ))
            : null}
        </View>
        <View style={answer.buttons}>
          {showAnswer ? (
            <>
              <TouchableOpacity onPress={() => getNextCard()} style={[answer.buttonAnswer, answer.buttonEasy]}>
                <Text style={[answer.buttonShowAnswerText, { color: "white" }]}>Easy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => getNextCard()} style={[answer.buttonAnswer, answer.buttonMedium]}>
                <Text style={answer.buttonShowAnswerText}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => getNextCard()} style={[answer.buttonAnswer, answer.buttonHard]}>
                <Text style={[answer.buttonShowAnswerText, { color: "white" }]}>Hard</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={answer.buttonAnswer} onPress={() => setShowAnswer(true)}>
              <Text style={answer.buttonShowAnswerText}>show answer</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Container>
  );
};

const AnimatedTitle = memo((props: { text: string }) => {
  const [animationTitle] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animationTitle, {
        toValue: 0,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animationTitle, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [props.text]);

  return (
    <Animated.View style={[root.title, { opacity: animationTitle, transform: [{ scale: animationTitle }] }]}>
      <MDIcon name="bolt" size={30} />
      <Text style={{ fontSize: 26, fontFamily: font.Montserrat.medium }}>{props.text}</Text>
    </Animated.View>
  );
});
