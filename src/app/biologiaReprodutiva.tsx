import Collapsible from "@/components/Collapsible";
import DetalhesView from "@/components/DetalhesView";
import { useDatabase } from "@/hooks/useDatabase";
import {
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

export default function BiologiaReprodutiva() {
  const params = useLocalSearchParams<NavigationProps>();
  const [bioRep, setBioRep] = useState<BiologiaReprodutivaDatabase>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { findBioRepeByArvoreId } = useDatabase();

  async function buscarBioReprod() {
    try {
      const buscaBioRep = await findBioRepeByArvoreId(
        params.arvoreId as string
      );
      if (buscaBioRep) {
        setBioRep(buscaBioRep);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Aconteceu um erro ao tentar buscar pela árvore selecionada: " +
          params.nomeArvore +
          " \n\n " +
          error
      );
    }
  }
  useEffect(() => {
    buscarBioReprod();
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
            <Text className="m-1 text-2xl font-semibold text-start bg-verde rounded-xl p-2">
              {"Tipo: "} {bioRep!.tipo ? bioRep!.tipo : "Não informada"}
            </Text>
            <DetalhesView
              color={"bg-verde-claro"}
              title="Descrição"
              contentTextHtml={{
                html: bioRep!.descricao,
              }}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}
