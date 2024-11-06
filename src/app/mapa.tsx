import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

type MapaProps = {
  listaCoordenada: Coordenada[];
  nomeArvore: string;
};

type Coordenada = {
  latitude: number;
  longitude: number;
};

export default function Mapa() {
  const router = useRouter();
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
        {/* <Marker coordinate={cordinate}>
          <Callout>
            <View className="p-3">
              <Text className="text-lg font-semibold">Arvore 1</Text>
            </View>
          </Callout>
        </Marker>*/}
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
