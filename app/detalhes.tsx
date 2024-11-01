import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Detalhes() {
  const params = useLocalSearchParams();

  return (
    <View className="h-full w-full bg-verde-claro">
      <Stack.Screen
        options={{
          title: params.id as string,
        }}
      />
      <View className="flex flex-col mx-2">
        <View className="flex flex-col gap-4">
          <Text className="text-4xl">Detalhes</Text>
        </View>
      </View>
    </View>
  );
}
