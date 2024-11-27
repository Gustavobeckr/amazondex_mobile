import { Image, Text, View } from "react-native";
type FotoViewProp = {
  descricao: string;
  id: number;
};

export default function FotosView({ id, descricao }: FotoViewProp) {
  return (
    <View className="flex h-96 my-2 mb-5">
      <Image
        resizeMode="contain"
        className="flex h-full w-full"
        src={`http://191.96.251.229:8080/arquivo/view/${id}`}
      />
      <Text className="flex">{descricao}</Text>
    </View>
  );
}
