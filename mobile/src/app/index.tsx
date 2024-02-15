import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { HomeTab } from "./navigation";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  const [loaded] = useFonts({
    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={s.wrapper}>
        <HomeTab />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight as number,
      },
      ios: {
        marginTop: 0,
      },
    }),
  },
});
