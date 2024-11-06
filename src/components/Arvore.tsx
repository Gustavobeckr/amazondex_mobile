import { useRouter } from "expo-router";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  data: { id: number; nome: string };
};

export default function Arvore({ data, ...rest }: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity
      {...rest}
      onPress={() =>
        router.push({ pathname: "/detalhes", params: { id: data.nome } })
      }
      className="flex bg-verde-escuro rounded-xl p-5"
    >
      <Text className="text-center text-2xl">{data.nome}</Text>
    </TouchableOpacity>
  );
}
