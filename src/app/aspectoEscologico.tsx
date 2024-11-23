import Collapsible from "@/components/Collapsible";
import DetalhesView from "@/components/DetalhesView";
import { useDatabase } from "@/hooks/useDatabase";
import {
  ArvoreDataBase,
  BiologiaReprodutivaDatabase,
  NavigationProps,
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

export default function AspectosEcologicos() {
  const params = useLocalSearchParams<NavigationProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [arvore, setArvore] = useState<ArvoreDataBase>();
  const { findArvoreById } = useDatabase();

  async function buscarArvore() {
    try {
      const buscaArvore = await findArvoreById(params.arvoreId as string);
      if (buscaArvore) {
        setArvore(buscaArvore);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Aconteceu um erro ao tentar buscar pela arvore selecionada: " +
          params.nomeArvore
      );
    }
  }
  useEffect(() => {
    buscarArvore();
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
              title="Aspectos Ecológicos"
              contentTextHtml={{
                html: arvore!.aspectos_ecologicos,
              }}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}
