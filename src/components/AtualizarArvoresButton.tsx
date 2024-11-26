import useArvore from "@/hooks/useArvore";
import * as Network from "expo-network";
import { ListRestart } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity, View } from "react-native";

export default function AtualizarArvoresButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { atualizarArvores } = useArvore();

  async function verifirarConexaoInternet() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    return isInternetReachable;
  }

  const buscarArvoresCadastradas = async () => {
    setIsLoading(true);
    const celularConectado = await verifirarConexaoInternet();

    if (celularConectado) {
      const response = await atualizarArvores();
      if (!response) {
        Alert.alert(
          "Erro",
          "Aconteceu um erro ao tentar atualizar as árvores cadastradas"
        );
      }
    } else {
      Alert.alert(
        "Erro",
        "Não é possível atualizar as árvores cadastradas sem conexão com a internet."
      );
    }
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
