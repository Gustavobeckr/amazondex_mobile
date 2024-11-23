import useArvore from "@/hooks/useArvore";
import { router } from "expo-router";
import { ListRestart } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

export default function AtualizarArvoresButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { atualizarArvores } = useArvore();

  const buscarArvoresCadastradas = async () => {
    setIsLoading(true);
    await atualizarArvores();
    setIsLoading(false);
  };

  return (
    <View className="flex">
      <TouchableOpacity onPress={buscarArvoresCadastradas}>
        {isLoading ? (
          <ActivityIndicator className="color-black" size="large" />
        ) : (
          <ListRestart color={"black"} size={26} />
        )}
      </TouchableOpacity>
    </View>
  );
}
