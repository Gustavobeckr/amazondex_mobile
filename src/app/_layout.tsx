import "react-native-reanimated";
import "../../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Sprout } from "lucide-react-native";
import { SQLiteProvider } from "expo-sqlite";
import { initializaDatabase } from "@/database/initializeDatabase";
import MenuButton from "@/components/MenuButton";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
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
    <SQLiteProvider databaseName="sqlite.db" onInit={initializaDatabase}>
      <Stack
        initialRouteName="home"
        screenOptions={{
          headerTitleStyle: { fontSize: 24 },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          statusBarAnimation: "fade",
          headerStyle: { backgroundColor: "#A5D4A9" },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Plantas Cadastradas",
            headerRight() {
              return <MenuButton />;
            },
            headerLeft() {
              return <Sprout color={"black"} size={26} />;
            },
          }}
        />
        <Stack.Screen name="detalhes" />
        <Stack.Screen name="mapa" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
