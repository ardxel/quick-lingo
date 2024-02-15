import { BottomTabNavigationOptions, BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import { RouteConfig, NavigationState, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationOptions, NativeStackNavigationEventMap } from "@react-navigation/native-stack";

export type StackRouteObject<T extends ParamListBase> = RouteConfig<
  T,
  keyof T,
  NavigationState<T>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap
>;

export type BottomTabRouteObject<T extends ParamListBase> = RouteConfig<
  T,
  keyof T,
  NavigationState<T>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap
>;
