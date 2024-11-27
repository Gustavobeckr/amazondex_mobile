import Collapsible from "@/components/Collapsible";
import DetalhesView from "@/components/DetalhesView";
import FotosView from "@/components/FotoView";
import { useDatabase } from "@/hooks/useDatabase";
import { FotoArvoreDataBase } from "@/types/arvore.types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Fotos() {
  const params = useLocalSearchParams();
  const [listaId, setListaId] = useState<FotoArvoreDataBase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { findFotoByArvoreId } = useDatabase();

  async function buscarFotos() {
    try {
      const buscaFoto = await findFotoByArvoreId(params.arvoreId as string);
      if (buscaFoto) {
        setListaId(buscaFoto);
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
    buscarFotos();
  }, []);
  return (
    <View className="w-screen h-full bg-verde-claro">
      <View className="flex mx-2 mb-2 p-3 bg-verde rounded-xl">
        <Stack.Screen
          options={{
            title: params.nomeArvore as string,
          }}
        />
        <FlatList
          data={listaId}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <FotosView id={item.foto_id} descricao={item.descricao} />
          )}
          contentContainerStyle={{ gap: 6 }}
        />
      </View>
    </View>
  );
}
