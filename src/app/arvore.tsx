import Collapsible from "@/components/Collapsible";
import DetalhesButton from "@/components/DetalhesButton";
import useArvore from "@/hooks/useArvore";
import { useDatabase } from "@/hooks/useDatabase";
import { ArvoreDataBase } from "@/types/arvore.types";
import {
  router,
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function Arvore() {
  const params = useLocalSearchParams();
  const { findFotoByArvoreId } = useDatabase();
  const [fotoID, setFotoID] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  async function buscarFotos() {
    try {
      const buscaFoto = await findFotoByArvoreId(params.arvoreId as string);
      if (buscaFoto) {
        setFotoID(buscaFoto[0].foto_id);
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
    setIsLoading(false);
  }, []);
  return (
    <ScrollView className="flex h-full w-full bg-verde-claro">
      {isLoading ? (
        <ActivityIndicator className="color-black" size="large" />
      ) : (
        <View>
          <Stack.Screen
            options={{
              title: params.nomeArvore as string,
            }}
          />
          <View className="flex flex-col mx-2 mb-2 p-3 gap-3 bg-verde-escuro h-screen rounded-xl">
            <TouchableOpacity
              activeOpacity={0.6}
              className="flex flex-col bg-cinza-claro rounded-xl p-1 "
              onPress={() =>
                router.push({
                  pathname: "/fotos",
                  params: {
                    arvoreId: params.arvoreId,
                    nomeArvore: params.nomeArvore,
                  },
                })
              }
            >
              <View className="flex h-44 p-1">
                <Image
                  resizeMode="cover"
                  className="h-full"
                  src="http://191.96.251.229:8080/arquivo/view/1"
                />
              </View>
              <View className="flex flex-row items-center justify-end">
                <Text className="font-semibold">Ver toda fotos</Text>
                <ChevronRight color={"black"} />
              </View>
            </TouchableOpacity>
            <Text className="m-1 text-4xl font-semibold text-center">
              {params.nomeArvore}
            </Text>
            <DetalhesButton
              text="Sobre"
              onPress={() => {
                router.push({
                  pathname: "/sobre",
                  params: {
                    arvoreId: params.arvoreId,
                    nomeArvore: params.nomeArvore,
                  },
                });
              }}
            />
            <DetalhesButton
              text="Biologia Reprodutiva"
              onPress={() => {
                router.push({
                  pathname: "/biologiaReprodutiva",
                  params: {
                    arvoreId: params.arvoreId,
                    nomeArvore: params.nomeArvore,
                  },
                });
              }}
            />
            <DetalhesButton
              text="Ocorrência Natural"
              onPress={() => {
                router.push({
                  pathname: "/mapa",
                  params: {
                    arvoreId: params.arvoreId,
                    nomeArvore: params.nomeArvore,
                  },
                });
              }}
            />
            <DetalhesButton
              text="Aspectos Ecológicos"
              onPress={() => {
                router.push({
                  pathname: "/aspectoEscologico",
                  params: {
                    arvoreId: params.arvoreId,
                    nomeArvore: params.nomeArvore,
                  },
                });
              }}
            />
            <DetalhesButton
              text="Aproveitamento"
              onPress={() => {
                router.push({
                  pathname: "/aproveitamento",
                  params: {
                    arvoreId: params.arvoreId,
                    nomeArvore: params.nomeArvore,
                  },
                });
              }}
            />
            <DetalhesButton
              text="Paisagismo"
              onPress={() => {
                router.push({
                  pathname: "/paisagismo",
                  params: {
                    arvoreId: params.arvoreId,
                    nomeArvore: params.nomeArvore,
                  },
                });
              }}
            />
            <DetalhesButton
              text="Cultivo"
              onPress={() => {
                router.push({
                  pathname: "/cultivo",
                  params: {
                    arvoreId: params.arvoreId,
                    nomeArvore: params.nomeArvore,
                  },
                });
              }}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
