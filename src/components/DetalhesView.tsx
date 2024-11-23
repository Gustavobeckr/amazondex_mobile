import React from "react";

import { Text, useWindowDimensions, View } from "react-native";
import RenderHTML, { HTMLSource } from "react-native-render-html";

export default function DetalhesView({
  title,
  contentTextHtml,
  color,
}: {
  title: string;
  contentTextHtml: HTMLSource;
  color: string;
}) {
  const { width } = useWindowDimensions();

  return (
    <View className={`flex flex-col p-5 rounded-xl ` + color}>
      <Text className="text-xl font-semibold">{title}</Text>

      <RenderHTML contentWidth={width} source={contentTextHtml} />
    </View>
  );
}
