import { ListRestart } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

export default function MenuButton() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, [isLoading]);

  return (
    <View className="flex">
      <TouchableOpacity onPress={() => setIsLoading(true)}>
        {isLoading ? (
          <ActivityIndicator className="color-black" size="large" />
        ) : (
          <ListRestart color={"black"} size={26} />
        )}
      </TouchableOpacity>
    </View>
  );
}
