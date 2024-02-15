import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateDeckScreen from "screens/createDeck";
import HomeDeckListScreen from "screens/homeDeckList";
import { StackRouteObject } from "types";

export type DeckStackParamList = {
  HomeDeckList: undefined;
  CreateDeck: undefined;
};

const routes: Array<StackRouteObject<DeckStackParamList>> = [
  { name: "HomeDeckList", component: HomeDeckListScreen },
  { name: "CreateDeck", component: CreateDeckScreen as () => JSX.Element },
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
