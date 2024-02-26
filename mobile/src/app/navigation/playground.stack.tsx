import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePlaygroundScreen from "screens/homePlayground";
import PlaygroundScreen from "screens/playground";
import { StackRouteObject } from "types";

export type PlaygroundStackList = {
  HomePlayground: undefined;
  Playground: { deckName: string };
};

const routes: Array<StackRouteObject<PlaygroundStackList>> = [
  { name: "HomePlayground", component: HomePlaygroundScreen as () => JSX.Element },
  { name: "Playground", component: PlaygroundScreen as () => JSX.Element },
] as const;

const Stack = createNativeStackNavigator<PlaygroundStackList>();

export const PlaygroundStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomePlayground"
      screenOptions={{
        headerShown: false,
      }}>
      {routes.map((route) => {
        return <Stack.Screen key={route.name} {...route} />;
      })}
    </Stack.Navigator>
  );
};
