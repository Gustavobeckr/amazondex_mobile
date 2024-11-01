import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View className="h-full w-full bg-verde-claro">
      <View className="flex flex-col mx-2">
        <Link
          href={{ pathname: "/detalhes", params: { id: "arvore 1" } }}
          className="bg-verde-escuro rounded-lg p-3 text-center text-2xl"
        >
          Árvore 1
        </Link>
      </View>
    </View>
  );
}
