import { useNavigation } from "@react-navigation/native";
import { ICard } from "entities/card";
import { useLingoSettings } from "entities/settings";
import { FC, PureComponent, ReactNode, memo, useEffect, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { Container } from "shared/ui";
import { copy } from "shared/utils";
import { color, font } from "shared/vars";
import { answer, header, root } from "./styles";
import { useQuickLingoGameManager } from "./useQuickLingoGameManager";

const displayHelperTypes = ["answer", "synonyms", "examples"] as const;

type DisplayHelperType = (typeof displayHelperTypes)[number];

type PlaygroundProps = {
  deckName: string;
};

const playgroundHelpItems: { id: number; value: DisplayHelperType; text: string }[] = [
  { id: 1, value: "answer", text: "answer" },
  { id: 2, value: "synonyms", text: "synonyms" },
  { id: 3, value: "examples", text: "examples" },
];

export const Playground: FC<PlaygroundProps> = (props) => {
  const gameManager = useQuickLingoGameManager(props.deckName);
  const settings = useLingoSettings();
  const [displayedHelperType, setDisplayedHelperType] = useState<DisplayHelperType>("answer");
  const [showAnswer, setShowAnswer] = useState(false);

  const displayAnswerInTable = Boolean(showAnswer && gameManager.currentCard && displayedHelperType === "answer");

  const getNextCard = () => {
    gameManager.popCard();
    setShowAnswer(false);
  };

  if (!gameManager.hasNext) {
    return <PlaygroundEmptyBlank />;
  }

  return (
    <Container style={{ width: "100%", height: "100%", alignItems: "center" }}>
      <PlaygroundHeader
        currentCardIndex={gameManager.currentCardIndex}
        cardsCount={gameManager.cardsCount}
        reloadGame={gameManager.reloadCards}
      />
      <View style={root.main}>
        <AnimatedCurrentCardSourceText text={gameManager.currentCard!.sourceText} />
        <PlaygroundTopUI
          showSynonyms={settings.settings!.showSynonymsHelper}
          showExamples={settings.settings!.showExamplesHelper}
          displayedHelperType={displayedHelperType}
          setDisplayedHelperType={(type: DisplayHelperType) => setDisplayedHelperType(type)}
        />
        <PlaygroundDisplay
          displayedHelperType={displayedHelperType}
          displayAnswer={displayAnswerInTable}
          currentCard={gameManager.currentCard}
        />
        <PlaygroundBottomUI
          setShowAnswer={() => setShowAnswer(true)}
          showAnswer={showAnswer}
          getNextCard={getNextCard}
        />
      </View>
    </Container>
  );
};

const PlaygroundEmptyBlank = memo(() => {
  const navigation = useNavigation();

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
});

type PlaygroundHeaderProps = {
  reloadGame: () => void;
  cardsCount: number;
  currentCardIndex: number;
};

class PlaygroundHeader extends PureComponent<PlaygroundHeaderProps> {
  render(): ReactNode {
    return (
      <View style={header.header}>
        <View>
          <TouchableOpacity onPress={() => this.props.reloadGame()} style={header.buttonReload}>
            <MDIcon name="sync" size={30} />
          </TouchableOpacity>
        </View>
        <View style={header.counter}>
          <Text style={header.counterParagraph}>{`${this.props.currentCardIndex} / ${this.props.cardsCount}`}</Text>
        </View>
      </View>
    );
  }
}

const AnimatedCurrentCardSourceText = memo((props: { text: string }) => {
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

type PlaygroundTopUIProps = {
  setDisplayedHelperType: (type: DisplayHelperType) => void;
  displayedHelperType: DisplayHelperType;
  showSynonyms: boolean;
  showExamples: boolean;
};

class PlaygroundTopUI extends PureComponent<PlaygroundTopUIProps> {
  render(): ReactNode {
    let copyItems = copy(playgroundHelpItems);

    if (!this.props.showExamples) {
      copyItems = copyItems.filter((item) => item.value !== "examples");
    }

    if (!this.props.showSynonyms) {
      copyItems = copyItems.filter((item) => item.value !== "synonyms");
    }

    return (
      <View style={root.helpMenu}>
        {copyItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => this.props.setDisplayedHelperType(item.value)}
            style={[
              root.helpButton,
              { flex: 1 / displayHelperTypes.length },
              this.props.displayedHelperType === item.value ? { backgroundColor: color.chocolate } : null,
            ]}>
            <Text
              style={[
                root.helpButtonText,
                this.props.displayedHelperType === item.value ? { color: color.whitesmoke } : null,
              ]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

type PlaygroundDisplayProps = {
  currentCard: ICard;
  displayAnswer: boolean;
  displayedHelperType: DisplayHelperType;
};

class PlaygroundDisplay extends PureComponent<PlaygroundDisplayProps> {
  constructor(props: PlaygroundDisplayProps) {
    super(props);
    this.highlightSourceTextInExample.bind(this);
    this.getDisplayedInner.bind(this);
  }

  private highlightSourceTextInExample(example: string) {
    const currentCardSourceText = this.props.currentCard.sourceText;
    const currentCardSourceTextLength = currentCardSourceText.length;
    const index = example.toLowerCase().indexOf(currentCardSourceText.toLowerCase());

    if (index === -1) {
      return <Text style={[answer.translatedText, { fontSize: 18 }]}>{example}</Text>;
    }

    return (
      <Text style={[answer.translatedText, { fontSize: 18 }]}>
        {example.substring(0, index)}
        <Text style={[answer.translatedText, { fontFamily: font.Montserrat.bold, fontSize: 18 }]}>
          {example.substring(index, index + currentCardSourceTextLength)}
        </Text>
        {example.substring(index + currentCardSourceTextLength)}
      </Text>
    );
  }

  private getDisplayedInner() {
    switch (this.props.displayedHelperType) {
      case "answer":
        if (this.props.displayAnswer) {
          return this.props.currentCard.translations.map((answerText: string) => (
            <Text key={answerText} style={answer.translatedText}>
              {answerText}
            </Text>
          ));
        }
        break;
      case "synonyms":
        return this.props.currentCard.synonyms.map((synonym: string) => (
          <View
            key={synonym}
            style={{ width: "100%", padding: 4, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={answer.translatedText}>{synonym}</Text>
          </View>
        ));
      case "examples":
        return this.props.currentCard.examples.map((example: string, index: number) => (
          <View
            key={example}
            style={{ width: "100%", alignItems: "center", marginHorizontal: 20, flexDirection: "row", padding: 6 }}>
            <Text
              style={[answer.translatedText, { minWidth: 25, textAlign: "center", fontSize: 18 }]}>{`${index}. `}</Text>
            {this.highlightSourceTextInExample(example)}
          </View>
        ));
      default:
        return null;
    }
  }

  render(): ReactNode {
    const inner = this.getDisplayedInner();

    return <View style={[answer.displayAnswer, { padding: 8 }]}>{inner}</View>;
  }
}

type PlaygroundBottomUIProps = {
  getNextCard: () => void;
  setShowAnswer: () => void;
  showAnswer: boolean;
};

class PlaygroundBottomUI extends PureComponent<PlaygroundBottomUIProps> {
  render(): ReactNode {
    return (
      <View style={answer.buttons}>
        {this.props.showAnswer ? (
          <>
            <TouchableOpacity onPress={this.props.getNextCard} style={[answer.buttonAnswer, answer.buttonEasy]}>
              <Text style={[answer.buttonShowAnswerText, { color: "white" }]}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.getNextCard} style={[answer.buttonAnswer, answer.buttonMedium]}>
              <Text style={answer.buttonShowAnswerText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.getNextCard} style={[answer.buttonAnswer, answer.buttonHard]}>
              <Text style={[answer.buttonShowAnswerText, { color: "white" }]}>Hard</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={answer.buttonAnswer} onPress={this.props.setShowAnswer}>
            <Text style={answer.buttonShowAnswerText}>show answer</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
