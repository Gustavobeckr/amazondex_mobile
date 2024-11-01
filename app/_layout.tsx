import "react-native-reanimated";
import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Sprout } from "lucide-react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#A5D4A9" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Plantas Cadastradas",
          headerRight() {
            return <Feather name="menu" size={26} />;
          },
          headerLeft() {
            return <Sprout color={"black"} size={26} />;
          },
        }}
      />
      <Stack.Screen name="detalhes" />
    </Stack>
  );
}
