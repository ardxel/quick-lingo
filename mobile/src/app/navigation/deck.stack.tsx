import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateDeckScreen from "screens/createDeck";
import EditDeckScreen from "screens/editDeck";
import HomeDeckListScreen from "screens/homeDeckList";
import { StackRouteObject } from "types";

export type DeckStackParamList = {
  HomeDeckList: undefined;
  CreateDeck: undefined;
  EditDeck: { editableDeckName: string };
};

const routes: Array<StackRouteObject<DeckStackParamList>> = [
  /** TODO: fix forced type assertion */
  { name: "HomeDeckList", component: HomeDeckListScreen as () => JSX.Element },
  { name: "CreateDeck", component: CreateDeckScreen as () => JSX.Element },
  { name: "EditDeck", component: EditDeckScreen as () => JSX.Element },
] as const;

const Stack = createNativeStackNavigator<DeckStackParamList>();

export const DeckStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routes.map((route) => {
        return <Stack.Screen key={route.name} {...route} />;
      })}
    </Stack.Navigator>
  );
};
