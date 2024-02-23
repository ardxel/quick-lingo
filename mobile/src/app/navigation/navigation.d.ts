import { DeckStackParamList } from "./deck.stack";
import { RootTabParamList } from "./home.tab";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
    interface RootParamList extends DeckStackParamList {}
  }
}
