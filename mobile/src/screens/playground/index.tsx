import { NavigationProp, RouteProp } from "@react-navigation/native";
import { PlaygroundStackList } from "app/navigation/playground.stack";
import { Playground } from "features/playground";
import { Container } from "shared/ui";

type PlaygroundScreenProps = {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  route: RouteProp<PlaygroundStackList, "Playground">;
};

export default function PlaygroundScreen(props: PlaygroundScreenProps) {
  return (
    <Container>
      <Playground deckName={props.route.params.deckName} />
    </Container>
  );
}
