import Collapsible from "@/components/Collapsible";
import DetalhesView from "@/components/DetalhesView";
import { useDatabase } from "@/hooks/useDatabase";
import {
  ArvoreDataBase,
  BiologiaReprodutivaDatabase,
  NavigationProps,
  PaisagismoDataBase,
} from "@/types/arvore.types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Paisagismo() {
  const params = useLocalSearchParams<NavigationProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paisagismo, setPaisagismo] = useState<PaisagismoDataBase>();
  const { findPaisagismoByArvoreId } = useDatabase();

  async function buscarPaisagismo() {
    try {
      const buscaArvore = await findPaisagismoByArvoreId(
        params.arvoreId as string
      );
      if (buscaArvore) {
        setPaisagismo(buscaArvore);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Aconteceu um erro ao tentar buscar pela paisagismo selecionada: " +
          params.nomeArvore
      );
    }
  }
  useEffect(() => {
    buscarPaisagismo();
  }, []);
  return (
    <ScrollView className="w-screen h-auto bg-verde-claro">
      <View className="flex flex-col mx-2 mb-2 p-3 gap-3 bg-verde-escuro rounded-xl">
        <Stack.Screen
          options={{
            title: params.nomeArvore as string,
          }}
        />
        {isLoading ? (
          <ActivityIndicator className="color-black" size="large" />
        ) : (
          <>
            <DetalhesView
              color={"bg-verde-claro"}
              title="Descrição do Paisagismo"
              contentTextHtml={{
                html: paisagismo!.descricao,
              }}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}
