import Collapsible from "@/components/Collapsible";
import DetalhesView from "@/components/DetalhesView";
import { useDatabase } from "@/hooks/useDatabase";
import {
  ArvoreDataBase,
  BiologiaReprodutivaDatabase,
  CultivoDTO,
  NavigationProps,
  PaisagismoDataBase,
  TipoCuidadoEnum,
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

export default function Cultivo() {
  const params = useLocalSearchParams<NavigationProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cultivo, setCultivo] = useState<CultivoDTO>();
  const { findCultivoByArvoreId } = useDatabase();

  async function buscarPaisagismo() {
    try {
      const buscaArvore = await findCultivoByArvoreId(
        params.arvoreId as string
      );
      if (buscaArvore) {
        setCultivo(buscaArvore);

        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Aconteceu um erro ao tentar buscar pela cultivo selecionada: " +
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
              title="Descrição Cultivo"
              contentTextHtml={{
                html: cultivo!.descricao,
              }}
            />
            {cultivo?.cuidadosEspeciais.map((cuidadoEspecial, index) => {
              return (
                <>
                  <Collapsible
                    key={index}
                    color={"bg-verde"}
                    title={
                      "Cuidados com " +
                      TipoCuidadoEnum[cuidadoEspecial.tipo_cuidado]
                    }
                    contentTextHtml={{
                      html: cuidadoEspecial.descricao,
                    }}
                  />
                </>
              );
            })}
          </>
        )}
      </View>
    </ScrollView>
  );
}
