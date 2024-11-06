import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Map from "react-native-maps";

export default function Detalhes() {
  const params = useLocalSearchParams();
  const router = useRouter();
  return (
    <View className="h-full w-full bg-verde-claro">
      <Stack.Screen
        options={{
          title: params.id as string,
        }}
      />
      <View className="flex flex-col mx-2">
        <TouchableOpacity
          onPress={() => router.push({ pathname: "/mapa" })}
          className="flex bg-verde-escuro rounded-xl p-5"
        >
          <Text>Mapa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
