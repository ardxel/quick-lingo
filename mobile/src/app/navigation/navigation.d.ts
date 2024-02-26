import { DeckStackParamList } from "./deck.stack";
import { RootTabParamList } from "./home.tab";
import { PlaygroundStackList } from "./playground.stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
    interface RootParamList extends DeckStackParamList {}
    interface RootParamList extends PlaygroundStackList {}
  }
}
