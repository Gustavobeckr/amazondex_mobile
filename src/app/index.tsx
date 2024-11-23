import ArvoreButton from "@/components/ArvoreButton";
import useArvore from "@/hooks/useArvore";
import { ArvoreDataBase } from "@/types/arvore.types";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View, RefreshControl, Alert } from "react-native";

export default function Home() {
  const [arvores, setArvores] = useState<ArvoreDataBase[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { atualizarArvores } = useArvore();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  async function listarArvores() {
    const response = await atualizarArvores();
    if (response) {
      setArvores(response);
    } else {
      Alert.alert(
        "Erro",
        "Aconteceu um erro ao tentar atualizar as árvores cadastradas"
      );
    }
  }

  useEffect(() => {
    listarArvores();
  }, [refreshing]);

  return (
    <View className="h-full w-full px-2 bg-verde-claro">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={arvores}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ArvoreButton data={item} />}
        contentContainerStyle={{ gap: 8 }}
      />
    </View>
  );
}
