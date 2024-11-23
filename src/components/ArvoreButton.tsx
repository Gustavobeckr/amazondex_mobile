import { ArvoreDataBase } from "@/types/arvore.types";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  data: ArvoreDataBase;
};

export default function ArvoreButton({ data, ...rest }: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity
      {...rest}
      onPress={() =>
        router.push({
          pathname: "/arvore",
          params: { nomeArvore: data.nome, arvoreId: data.id },
        })
      }
      className="flex bg-verde-escuro rounded-xl p-5"
    >
      <Text className="text-center text-2xl">{data.nome}</Text>
    </TouchableOpacity>
  );
}
