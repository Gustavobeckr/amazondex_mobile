import React, { useEffect } from "react";
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

type Props = {
  title: string;
  contentTextHtml: HTMLSource;
  color: string;
};

export default function Collapsible({ title, contentTextHtml, color }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [classNameButton, setClassNameButton] = useState(
    `flex flex-row items-center gap-4 p-5 rounded-xl ` + color
  );
  const [classNameText, setClassNameText] = useState(
    `px-4  rounded-xl ` + color
  );
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isOpen) {
      setClassNameButton(
        `flex flex-row items-center gap-4 p-5  rounded-xl rounded-b-none ` +
          color
      );
      setClassNameText(`px-4  rounded-xl rounded-t-none ` + color);
    } else {
      setClassNameButton(
        `flex flex-row items-center gap-4 p-5  rounded-xl ` + color
      );
      setClassNameText(`px-4  rounded-xl` + color);
    }
  }, [isOpen]);

  return (
    <View>
      <TouchableOpacity
        className={classNameButton}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        {isOpen ? (
          <ChevronUp color={"black"} size={24} />
        ) : (
          <ChevronDown color={"black"} size={24} />
        )}
        <Text className="text-xl font-semibold">{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View className={classNameText}>
          <RenderHTML contentWidth={width} source={contentTextHtml} />
        </View>
      )}
    </View>
  );
}
