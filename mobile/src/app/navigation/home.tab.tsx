import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import SettingScreen from "screens/settings";
import { color } from "shared/vars";
import { BottomTabRouteObject } from "types";
import { DeckStack, DeckStackParamList } from "./deck.stack";
import { PlaygroundStack, PlaygroundStackList } from "./playground.stack";

export type RootTabParamList = {
  Deck: NavigatorScreenParams<DeckStackParamList>;
  Play: NavigatorScreenParams<PlaygroundStackList>;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const routes: Array<BottomTabRouteObject<RootTabParamList>> = [
  {
    name: "Deck",
    component: DeckStack,
  },
  {
    name: "Play",
    component: PlaygroundStack,
  },
  {
    name: "Settings",
    component: SettingScreen,
  },
];

export const HomeTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={({ navigation, descriptors, state }) => {
          return (
            <View
              style={{
                backgroundColor: color.whitesmoke,
                flexDirection: "row",
                height: 75,
                justifyContent: "space-around",
              }}>
              {state.routes.map((route, index) => {
                descriptors[route.key];

                const { options } = descriptors[route.key];

                const isFocused = state.index === index;
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                      ? options.title
                      : route.name;

                const onPress = () => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    if (route.name === "Play") {
                      navigation.navigate("Play", { screen: "HomePlayground" });
                      return;
                    }
                    navigation.navigate(route.name, route.params);
                  }
                };

                const onLongPress = () => {
                  navigation.emit({
                    type: "tabLongPress",
                    target: route.key,
                  });
                };

                let iconName;
                switch (route.name as keyof RootTabParamList) {
                  case "Deck":
                    iconName = "list";
                    break;
                  case "Play":
                    iconName = "start";
                    break;
                  case "Settings":
                    iconName = "settings";
                    break;
                  default:
                    throw new Error(`${route.name} route is not implemented`);
                }

                return (
                  <Pressable
                    key={index}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <MDIcon name={iconName} size={30} />
                    <Text style={{ textAlign: "center" }}>{label as string}</Text>
                  </Pressable>
                );
              })}
            </View>
          );
        }}
        screenOptions={() => ({
          headerShown: false,
          headerTitle({ children }) {
            const title = children[0].toUpperCase() + children.substring(1);
            return <Text style={{ fontWeight: "500", fontSize: 25 }}>{title}</Text>;
          },
        })}>
        {routes.map((tab) => (
          <Tab.Screen {...tab} key={tab.name} />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
