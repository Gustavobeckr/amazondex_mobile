import Collapsible from "@/components/Collapsible";
import DetalhesView from "@/components/DetalhesView";
import { useDatabase } from "@/hooks/useDatabase";
import { AproveitamentoDTO, NavigationProps } from "@/types/arvore.types";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";

export default function Aproveitamento() {
  const params = useLocalSearchParams<NavigationProps>();
  const [aproveitamento, setAproveitamento] = useState<AproveitamentoDTO>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { findAproveitamentoByArvoreId } = useDatabase();

  async function buscarAproveitamento() {
    try {
      const buscaAproveitamento = await findAproveitamentoByArvoreId(
        params.arvoreId as string
      );
      if (buscaAproveitamento) {
        setAproveitamento(buscaAproveitamento);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Aconteceu um erro ao tentar buscar datos da árvore selecionada: " +
          params.nomeArvore +
          " \n\n " +
          error
      );
    }
  }
  useEffect(() => {
    buscarAproveitamento();
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
              color={"bg-verde"}
              title="Descrição Aproveitamento"
              contentTextHtml={{
                html: aproveitamento!.descricao,
              }}
            />
            <Text className="text-2xl mt-2 font-semibold text-center rounded-xl">
              Biotecnologia
            </Text>
            <Collapsible
              color={"bg-verde"}
              title="Composição"
              contentTextHtml={{
                html: aproveitamento!.biotecnologia.composicao,
              }}
            />
            <Collapsible
              color={"bg-verde"}
              title="Potencial Bioprodutos"
              contentTextHtml={{
                html: aproveitamento!.biotecnologia.potencia_bioprodutos,
              }}
            />
            <Text className="text-2xl mt-2 font-semibold text-center rounded-xl">
              Bioatividade
            </Text>
            <Collapsible
              color={"bg-verde"}
              title="Descrição"
              contentTextHtml={{
                html: aproveitamento!.bioatividade.descricao,
              }}
            />
            <Text className="text-2xl mt-2 font-semibold text-center rounded-xl">
              Alimentação
            </Text>
            <Collapsible
              color={"bg-verde"}
              title="Dados nutricionais"
              contentTextHtml={{
                html: aproveitamento!.alimentacao.dados_nutricionais,
              }}
            />
            <Collapsible
              color={"bg-verde"}
              title="Formas de consumo"
              contentTextHtml={{
                html: aproveitamento!.alimentacao.formas_consumo,
              }}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}
