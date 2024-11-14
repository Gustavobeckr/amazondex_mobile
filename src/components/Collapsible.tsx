import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML, { HTMLSource } from "react-native-render-html";

export default function Collapsible({
  title,
  contentTextHtml,
}: {
  title: string;
  contentTextHtml: HTMLSource;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();
  return (
    <View>
      <TouchableOpacity
        className="flex flex-row items-center justify-between p-5 bg-verde-escuro rounded-lg"
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Text className="text-lg font-semibold">{title}</Text>
        {isOpen ? (
          <ChevronUp color={"black"} size={24} />
        ) : (
          <ChevronDown color={"black"} size={24} />
        )}
      </TouchableOpacity>
      {isOpen && (
        <View className="px-4">
          <RenderHTML contentWidth={width} source={contentTextHtml} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
