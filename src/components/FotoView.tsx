import { Image, View } from "react-native";
type FotoViewProp = {
  id: number;
};

export default function FotosView({ id }: FotoViewProp) {
  return (
    <View className="flex h-96 my-2">
      <Image
        resizeMode="center"
        className="flex h-full w-full "
        src={`http://191.96.251.229:8080/arquivo/view/${id}`}
      />
    </View>
  );
}
