import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootTabParamList } from "app/navigation";
import { DeckStackParamList } from "app/navigation/deck.stack";
import { FC, useCallback, useState } from "react";
import { Container } from "shared/ui";
import { DeckScreenContext } from "./context";
import { HomeDeckScreenDeckList } from "./decklist";
import { HomeDeckListHeader } from "./header";

type HomeDeckListProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList>,
  NativeStackScreenProps<DeckStackParamList>
>;

const HomeDeckListScreen: FC<HomeDeckListProps> = ({ navigation }) => {
  const [searchDeckInput, setSearchDeckInput] = useState<string>("");

  const onSearhDeckInput = useCallback((userInput: string) => setSearchDeckInput(() => userInput), []);

  return (
    <Container>
      <DeckScreenContext.Provider value={{ onSearhDeckInput, searchDeckInput }}>
        <HomeDeckListHeader />
        <HomeDeckScreenDeckList />
      </DeckScreenContext.Provider>
    </Container>
  );
};

export default HomeDeckListScreen;
