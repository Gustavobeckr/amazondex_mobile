import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { ArrowLeft } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useDatabase } from "@/hooks/useDatabase";
import {
  NavigationProps,
  OcorrenciaNaturalDataBase,
} from "@/types/arvore.types";

type MapaProps = {
  listaCoordenada: Coordenada[];
  nomeArvore: string;
};

type Coordenada = {
  latitude: string;
  longitude: string;
};

export default function Mapa() {
  const router = useRouter();
  const params = useLocalSearchParams<NavigationProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ocorrenciaNatural, setOcorrenciaNatural] = useState<
    OcorrenciaNaturalDataBase[]
  >([]);
  const { findOcorrenciaNatByArvoreId } = useDatabase();
  async function buscarOcorrenciaNatural() {
    try {
      const buscaOcorrenciaNatural = await findOcorrenciaNatByArvoreId(
        params.arvoreId as string
      );
      if (buscaOcorrenciaNatural) {
        setOcorrenciaNatural(buscaOcorrenciaNatural);
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
    buscarOcorrenciaNatural();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialCamera={{
          pitch: 5,
          heading: 5,
          center: {
            latitude: -20.024236779911188,
            longitude: -55.14631969435725,
          },
          zoom: 4,
          altitude: 4,
        }}
      >
        {ocorrenciaNatural.map(({ latitude, longitude }, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
              }}
            >
              <Callout>
                <View className="p-1">
                  <Text className="text-md ">{params.nomeArvore}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.6}
        className="flex flex-row gap-1 items-center bg-verde-claro absolute p-3 mt-16 mx-3 rounded-full shadow shadow-black"
      >
        <ArrowLeft color={"black"} />
        <Text className=" text-lg">Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
