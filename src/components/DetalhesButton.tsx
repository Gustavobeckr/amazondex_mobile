import { useRouter } from "expo-router";
import { useState } from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  text: string;
};

export default function DetalhesButton({ text, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.6}
      className="flex bg-cinza-claro rounded-3xl p-5 shadow-lg"
    >
      <Text className="font-bold text-center text-xl">{text}</Text>
    </TouchableOpacity>
  );
}
