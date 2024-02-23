import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DeckStackParamList } from "./deck.stack";
import { RootTabParamList } from "./home.tab";

export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabNavigationProp<RootTabParamList, T>;

export type DeckStackSreenProps<T extends keyof DeckStackParamList> = NativeStackScreenProps<DeckStackParamList, T>;
